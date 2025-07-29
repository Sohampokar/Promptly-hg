import mongoose, { Document, Schema } from 'mongoose'

export interface IProgress extends Document {
  _id: string
  user: string
  course: string
  module?: string
  lesson?: string
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number // 0-100
  timeSpent: number // in minutes
  lastAccessed: Date
  attempts: number
  score?: number
  completedAt?: Date
  notes?: string
  bookmarks: string[] // lesson IDs
  createdAt: Date
  updatedAt: Date
}

const progressSchema = new Schema<IProgress>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  module: {
    type: Schema.Types.ObjectId
  },
  lesson: {
    type: Schema.Types.ObjectId
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  attempts: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  completedAt: Date,
  notes: String,
  bookmarks: [String]
}, {
  timestamps: true
})

// Indexes
progressSchema.index({ user: 1, course: 1 }, { unique: true })
progressSchema.index({ user: 1, status: 1 })
progressSchema.index({ course: 1, status: 1 })
progressSchema.index({ lastAccessed: -1 })

export const Progress = mongoose.models.Progress || mongoose.model<IProgress>('Progress', progressSchema)