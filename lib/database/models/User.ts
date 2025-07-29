import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  name: string
  role: 'student' | 'instructor' | 'admin'
  subscription: 'free' | 'premium' | 'enterprise'
  profile: {
    avatar?: string
    bio?: string
    location?: string
    website?: string
    socialLinks?: {
      twitter?: string
      linkedin?: string
      github?: string
    }
  }
  learning: {
    totalXp: number
    level: number
    streak: number
    lastActiveDate: Date
    achievements: string[]
    completedCourses: string[]
    enrolledCourses: string[]
  }
  preferences: {
    notifications: boolean
    theme: 'light' | 'dark'
    language: string
    timezone: string
  }
  security: {
    emailVerified: boolean
    emailVerificationToken?: string
    passwordResetToken?: string
    passwordResetExpires?: Date
    lastLogin?: Date
    loginAttempts: number
    lockUntil?: Date
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
  generateAuthToken(): string
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  subscription: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  },
  profile: {
    avatar: String,
    bio: { type: String, maxlength: 500 },
    location: String,
    website: String,
    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String
    }
  },
  learning: {
    totalXp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    achievements: [{ type: String }],
    completedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' }
  },
  security: {
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password
      delete ret.security.passwordResetToken
      delete ret.security.emailVerificationToken
      return ret
    }
  }
})

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ 'learning.totalXp': -1 })
userSchema.index({ createdAt: -1 })

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12')
    this.password = await bcrypt.hash(this.password, rounds)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.security.lockUntil && this.security.lockUntil > new Date())
})

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)