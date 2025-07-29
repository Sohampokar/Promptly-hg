import { User, IUser } from '../database/models/User'
import { JWTService } from '../auth/jwt'
import { connectToDatabase } from '../database/connection'
import crypto from 'crypto'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role?: 'student' | 'instructor'
}

export interface AuthResponse {
  success: boolean
  user?: Partial<IUser>
  token?: string
  refreshToken?: string
  message?: string
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      await connectToDatabase()

      // Check if user already exists
      const existingUser = await User.findOne({ email: data.email })
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists'
        }
      }

      // Create new user
      const user = new User({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role || 'student',
        security: {
          emailVerificationToken: crypto.randomBytes(32).toString('hex')
        }
      })

      await user.save()

      // Generate tokens
      const token = JWTService.generateToken(user)
      const refreshToken = JWTService.generateRefreshToken(user)

      return {
        success: true,
        user: user.toJSON(),
        token,
        refreshToken,
        message: 'Registration successful'
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: 'Registration failed'
      }
    }
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      await connectToDatabase()

      // Find user with password
      const user = await User.findOne({ email: credentials.email }).select('+password')
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        }
      }

      // Check if account is locked
      if (user.security.lockUntil && user.security.lockUntil > new Date()) {
        return {
          success: false,
          message: 'Account is temporarily locked due to too many failed attempts'
        }
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(credentials.password)
      if (!isPasswordValid) {
        // Increment login attempts
        user.security.loginAttempts += 1
        
        // Lock account after 5 failed attempts
        if (user.security.loginAttempts >= 5) {
          user.security.lockUntil = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
        }
        
        await user.save()
        
        return {
          success: false,
          message: 'Invalid email or password'
        }
      }

      // Reset login attempts on successful login
      user.security.loginAttempts = 0
      user.security.lockUntil = undefined
      user.security.lastLogin = new Date()
      await user.save()

      // Generate tokens
      const token = JWTService.generateToken(user)
      const refreshToken = JWTService.generateRefreshToken(user)

      return {
        success: true,
        user: user.toJSON(),
        token,
        refreshToken,
        message: 'Login successful'
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Login failed'
      }
    }
  }

  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const { userId } = JWTService.verifyRefreshToken(refreshToken)
      
      await connectToDatabase()
      const user = await User.findById(userId)
      
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      const newToken = JWTService.generateToken(user)
      const newRefreshToken = JWTService.generateRefreshToken(user)

      return {
        success: true,
        user: user.toJSON(),
        token: newToken,
        refreshToken: newRefreshToken
      }
    } catch (error) {
      return {
        success: false,
        message: 'Invalid refresh token'
      }
    }
  }

  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await connectToDatabase()
      
      const user = await User.findOne({ email })
      if (!user) {
        // Don't reveal if email exists
        return {
          success: true,
          message: 'If an account with that email exists, a password reset link has been sent'
        }
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      user.security.passwordResetToken = resetToken
      user.security.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      
      await user.save()

      // TODO: Send email with reset link
      // await EmailService.sendPasswordReset(user.email, resetToken)

      return {
        success: true,
        message: 'Password reset link sent to your email'
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      return {
        success: false,
        message: 'Failed to process password reset request'
      }
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      await connectToDatabase()
      
      const user = await User.findOne({
        'security.passwordResetToken': token,
        'security.passwordResetExpires': { $gt: new Date() }
      })

      if (!user) {
        return {
          success: false,
          message: 'Invalid or expired reset token'
        }
      }

      // Update password
      user.password = newPassword
      user.security.passwordResetToken = undefined
      user.security.passwordResetExpires = undefined
      user.security.loginAttempts = 0
      user.security.lockUntil = undefined

      await user.save()

      return {
        success: true,
        message: 'Password reset successful'
      }
    } catch (error) {
      console.error('Reset password error:', error)
      return {
        success: false,
        message: 'Failed to reset password'
      }
    }
  }
}