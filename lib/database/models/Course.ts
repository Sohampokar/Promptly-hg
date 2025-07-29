import mongoose, { Document, Schema } from 'mongoose'

export interface ICourse extends Document {
  _id: string
  title: string
  description: string
  slug: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  tags: string[]
  instructor: string
  modules: IModule[]
  prerequisites: string[]
  learningObjectives: string[]
  duration: {
    estimated: number // in minutes
    unit: 'minutes' | 'hours' | 'days' | 'weeks'
  }
  pricing: {
    type: 'free' | 'paid'
    price?: number
    currency?: string
  }
  media: {
    thumbnail?: string
    trailer?: string
    images?: string[]
  }
  stats: {
    enrolled: number
    completed: number
    rating: number
    reviewCount: number
  }
  settings: {
    isPublished: boolean
    allowComments: boolean
    certificateEnabled: boolean
    maxAttempts?: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface IModule {
  _id: string
  title: string
  description: string
  order: number
  lessons: ILesson[]
  estimatedDuration: number
  isLocked: boolean
}

export interface ILesson {
  _id: string
  title: string
  description: string
  type: 'theory' | 'practice' | 'assessment' | 'project' | 'video'
  content: {
    text?: string
    video?: string
    interactive?: any
    resources?: IResource[]
  }
  duration: number
  order: number
  isPreview: boolean
  xpReward: number
}

export interface IResource {
  title: string
  type: 'link' | 'file' | 'reference'
  url: string
  description?: string
}

const resourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  type: { type: String, enum: ['link', 'file', 'reference'], required: true },
  url: { type: String, required: true },
  description: String
})

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['theory', 'practice', 'assessment', 'project', 'video'], 
    required: true 
  },
  content: {
    text: String,
    video: String,
    interactive: Schema.Types.Mixed,
    resources: [resourceSchema]
  },
  duration: { type: Number, required: true }, // in minutes
  order: { type: Number, required: true },
  isPreview: { type: Boolean, default: false },
  xpReward: { type: Number, default: 100 }
}, { _id: true })

const moduleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  lessons: [lessonSchema],
  estimatedDuration: { type: Number, required: true },
  isLocked: { type: Boolean, default: false }
}, { _id: true })

const courseSchema = new Schema<ICourse>({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 2000
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{ type: String, trim: true }],
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modules: [moduleSchema],
  prerequisites: [String],
  learningObjectives: [String],
  duration: {
    estimated: { type: Number, required: true },
    unit: { 
      type: String, 
      enum: ['minutes', 'hours', 'days', 'weeks'], 
      default: 'hours' 
    }
  },
  pricing: {
    type: { type: String, enum: ['free', 'paid'], default: 'free' },
    price: Number,
    currency: { type: String, default: 'USD' }
  },
  media: {
    thumbnail: String,
    trailer: String,
    images: [String]
  },
  stats: {
    enrolled: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 }
  },
  settings: {
    isPublished: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true },
    certificateEnabled: { type: Boolean, default: true },
    maxAttempts: Number
  }
}, {
  timestamps: true
})

// Indexes
courseSchema.index({ slug: 1 })
courseSchema.index({ difficulty: 1, category: 1 })
courseSchema.index({ 'stats.rating': -1 })
courseSchema.index({ 'stats.enrolled': -1 })
courseSchema.index({ tags: 1 })
courseSchema.index({ createdAt: -1 })

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema)