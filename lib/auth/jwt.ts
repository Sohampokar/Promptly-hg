import jwt from 'jsonwebtoken'
import { IUser } from '../database/models/User'

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export class JWTService {
  private static readonly secret = process.env.JWT_SECRET || 'fallback-secret'
  private static readonly expiresIn = process.env.JWT_EXPIRES_IN || '7d'

  static generateToken(user: IUser): string {
    const payload: JWTPayload = {
      userId: user._id,
      email: user.email,
      role: user.role
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      issuer: 'promptmaster',
      audience: 'promptmaster-users'
    })
  }

  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret, {
        issuer: 'promptmaster',
        audience: 'promptmaster-users'
      }) as JWTPayload
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired')
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token')
      } else {
        throw new Error('Token verification failed')
      }
    }
  }

  static generateRefreshToken(user: IUser): string {
    const payload = {
      userId: user._id,
      type: 'refresh'
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: '30d',
      issuer: 'promptmaster',
      audience: 'promptmaster-refresh'
    })
  }

  static verifyRefreshToken(token: string): { userId: string } {
    try {
      const payload = jwt.verify(token, this.secret, {
        issuer: 'promptmaster',
        audience: 'promptmaster-refresh'
      }) as any

      if (payload.type !== 'refresh') {
        throw new Error('Invalid refresh token')
      }

      return { userId: payload.userId }
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }
}