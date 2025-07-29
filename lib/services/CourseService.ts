import { Course, ICourse } from '../database/models/Course'
import { Progress } from '../database/models/Progress'
import { User } from '../database/models/User'
import { connectToDatabase } from '../database/connection'

export interface CourseFilters {
  difficulty?: string
  category?: string
  tags?: string[]
  search?: string
  instructor?: string
  page?: number
  limit?: number
  sortBy?: 'newest' | 'popular' | 'rating' | 'title'
}

export interface CourseCreateData {
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  tags: string[]
  prerequisites: string[]
  learningObjectives: string[]
  duration: {
    estimated: number
    unit: 'minutes' | 'hours' | 'days' | 'weeks'
  }
  pricing: {
    type: 'free' | 'paid'
    price?: number
    currency?: string
  }
}

export class CourseService {
  static async getAllCourses(filters: CourseFilters = {}) {
    try {
      await connectToDatabase()

      const {
        difficulty,
        category,
        tags,
        search,
        instructor,
        page = 1,
        limit = 10,
        sortBy = 'newest'
      } = filters

      // Build query
      const query: any = { 'settings.isPublished': true }

      if (difficulty) {
        query.difficulty = difficulty
      }

      if (category) {
        query.category = category
      }

      if (tags && tags.length > 0) {
        query.tags = { $in: tags }
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      }

      if (instructor) {
        query.instructor = instructor
      }

      // Build sort
      let sort: any = {}
      switch (sortBy) {
        case 'popular':
          sort = { 'stats.enrolled': -1 }
          break
        case 'rating':
          sort = { 'stats.rating': -1 }
          break
        case 'title':
          sort = { title: 1 }
          break
        default:
          sort = { createdAt: -1 }
      }

      const skip = (page - 1) * limit

      const [courses, total] = await Promise.all([
        Course.find(query)
          .populate('instructor', 'name profile.avatar')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        Course.countDocuments(query)
      ])

      return {
        success: true,
        data: courses,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    } catch (error) {
      console.error('Get courses error:', error)
      return {
        success: false,
        error: 'Failed to fetch courses'
      }
    }
  }

  static async getCourseById(courseId: string, userId?: string) {
    try {
      await connectToDatabase()

      const course = await Course.findById(courseId)
        .populate('instructor', 'name profile.avatar profile.bio')
        .lean()

      if (!course) {
        return {
          success: false,
          error: 'Course not found'
        }
      }

      let userProgress = null
      if (userId) {
        userProgress = await Progress.findOne({
          user: userId,
          course: courseId
        }).lean()
      }

      return {
        success: true,
        data: {
          ...course,
          userProgress
        }
      }
    } catch (error) {
      console.error('Get course error:', error)
      return {
        success: false,
        error: 'Failed to fetch course'
      }
    }
  }

  static async createCourse(data: CourseCreateData, instructorId: string) {
    try {
      await connectToDatabase()

      const course = new Course({
        ...data,
        instructor: instructorId,
        modules: []
      })

      await course.save()

      return {
        success: true,
        data: course,
        message: 'Course created successfully'
      }
    } catch (error) {
      console.error('Create course error:', error)
      return {
        success: false,
        error: 'Failed to create course'
      }
    }
  }

  static async updateCourse(courseId: string, data: Partial<CourseCreateData>, userId: string) {
    try {
      await connectToDatabase()

      const course = await Course.findOne({
        _id: courseId,
        instructor: userId
      })

      if (!course) {
        return {
          success: false,
          error: 'Course not found or unauthorized'
        }
      }

      Object.assign(course, data)
      await course.save()

      return {
        success: true,
        data: course,
        message: 'Course updated successfully'
      }
    } catch (error) {
      console.error('Update course error:', error)
      return {
        success: false,
        error: 'Failed to update course'
      }
    }
  }

  static async enrollInCourse(courseId: string, userId: string) {
    try {
      await connectToDatabase()

      const [course, user, existingProgress] = await Promise.all([
        Course.findById(courseId),
        User.findById(userId),
        Progress.findOne({ user: userId, course: courseId })
      ])

      if (!course) {
        return {
          success: false,
          error: 'Course not found'
        }
      }

      if (!user) {
        return {
          success: false,
          error: 'User not found'
        }
      }

      if (existingProgress) {
        return {
          success: false,
          error: 'Already enrolled in this course'
        }
      }

      // Create progress record
      const progress = new Progress({
        user: userId,
        course: courseId,
        status: 'in-progress'
      })

      // Update user's enrolled courses
      if (!user.learning.enrolledCourses.includes(courseId)) {
        user.learning.enrolledCourses.push(courseId)
      }

      // Update course enrollment count
      course.stats.enrolled += 1

      await Promise.all([
        progress.save(),
        user.save(),
        course.save()
      ])

      return {
        success: true,
        message: 'Successfully enrolled in course'
      }
    } catch (error) {
      console.error('Enroll course error:', error)
      return {
        success: false,
        error: 'Failed to enroll in course'
      }
    }
  }

  static async getUserCourses(userId: string) {
    try {
      await connectToDatabase()

      const progressRecords = await Progress.find({ user: userId })
        .populate({
          path: 'course',
          populate: {
            path: 'instructor',
            select: 'name profile.avatar'
          }
        })
        .sort({ lastAccessed: -1 })
        .lean()

      return {
        success: true,
        data: progressRecords
      }
    } catch (error) {
      console.error('Get user courses error:', error)
      return {
        success: false,
        error: 'Failed to fetch user courses'
      }
    }
  }

  static async updateProgress(userId: string, courseId: string, lessonId: string, data: any) {
    try {
      await connectToDatabase()

      const progress = await Progress.findOneAndUpdate(
        { user: userId, course: courseId },
        {
          $set: {
            lesson: lessonId,
            lastAccessed: new Date(),
            ...data
          }
        },
        { new: true, upsert: true }
      )

      // Award XP if lesson completed
      if (data.status === 'completed') {
        await User.findByIdAndUpdate(userId, {
          $inc: { 'learning.totalXp': data.xpReward || 100 }
        })
      }

      return {
        success: true,
        data: progress
      }
    } catch (error) {
      console.error('Update progress error:', error)
      return {
        success: false,
        error: 'Failed to update progress'
      }
    }
  }
}