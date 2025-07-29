import mongoose, { Document, Schema } from 'mongoose'

export interface IAssessment extends Document {
  _id: string
  title: string
  description: string
  course: string
  module?: string
  questions: IQuestion[]
  settings: {
    timeLimit: number // in minutes
    passingScore: number // percentage
    maxAttempts: number
    shuffleQuestions: boolean
    showResults: boolean
    allowReview: boolean
  }
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface IQuestion {
  _id: string
  type: 'multiple-choice' | 'multiple-select' | 'short-answer' | 'scenario' | 'code'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}

export interface IAssessmentAttempt extends Document {
  _id: string
  assessment: string
  user: string
  answers: Map<string, any>
  score: number
  passed: boolean
  timeSpent: number
  startedAt: Date
  completedAt?: Date
  feedback?: string
  createdAt: Date
}

const questionSchema = new Schema<IQuestion>({
  type: {
    type: String,
    enum: ['multiple-choice', 'multiple-select', 'short-answer', 'scenario', 'code'],
    required: true
  },
  question: { type: String, required: true },
  options: [String],
  correctAnswer: Schema.Types.Mixed,
  explanation: { type: String, required: true },
  points: { type: Number, required: true, min: 1 },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [String]
}, { _id: true })

const assessmentSchema = new Schema<IAssessment>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  module: Schema.Types.ObjectId,
  questions: [questionSchema],
  settings: {
    timeLimit: { type: Number, required: true },
    passingScore: { type: Number, required: true, min: 0, max: 100 },
    maxAttempts: { type: Number, default: 3 },
    shuffleQuestions: { type: Boolean, default: true },
    showResults: { type: Boolean, default: true },
    allowReview: { type: Boolean, default: true }
  },
  isActive: { type: Boolean, default: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const assessmentAttemptSchema = new Schema<IAssessmentAttempt>({
  assessment: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: {
    type: Map,
    of: Schema.Types.Mixed
  },
  score: { type: Number, required: true, min: 0, max: 100 },
  passed: { type: Boolean, required: true },
  timeSpent: { type: Number, required: true },
  startedAt: { type: Date, required: true },
  completedAt: Date,
  feedback: String
}, {
  timestamps: true
})

// Indexes
assessmentSchema.index({ course: 1 })
assessmentSchema.index({ createdBy: 1 })
assessmentAttemptSchema.index({ user: 1, assessment: 1 })
assessmentAttemptSchema.index({ assessment: 1, createdAt: -1 })

export const Assessment = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', assessmentSchema)
export const AssessmentAttempt = mongoose.models.AssessmentAttempt || mongoose.model<IAssessmentAttempt>('AssessmentAttempt', assessmentAttemptSchema)