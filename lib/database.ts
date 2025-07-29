// Database schema and connection utilities
// In production, use Prisma, Drizzle, or your preferred ORM

export interface User {
  id: string
  email: string
  name: string
  role: "student" | "instructor" | "admin"
  subscription: "free" | "premium" | "enterprise"
  joinDate: string
  lastActive: string
  totalXp: number
  level: number
  streak: number
  achievements: string[]
  preferences: {
    notifications: boolean
    theme: "light" | "dark"
    language: string
  }
}

export interface Course {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  instructorId: string
  modules: Module[]
  prerequisites: string[]
  learningObjectives: string[]
  tags: string[]
  rating: number
  enrolled: number
  price: number
  createdAt: string
  updatedAt: string
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
  estimatedDuration: number
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  description: string
  type: "theory" | "practice" | "assessment" | "project"
  content: LessonContent
  duration: number
  order: number
  prerequisites: string[]
  learningObjectives: string[]
}

export interface LessonContent {
  sections: ContentSection[]
  resources: Resource[]
  exercises: Exercise[]
}

export interface ContentSection {
  id: string
  title: string
  type: "text" | "video" | "interactive" | "code"
  content: string
  order: number
}

export interface Resource {
  id: string
  title: string
  type: "link" | "file" | "reference"
  url: string
  description: string
}

export interface Exercise {
  id: string
  title: string
  type: "prompt-writing" | "multiple-choice" | "scenario"
  instructions: string
  solution?: string
  hints: string[]
}

export interface UserProgress {
  userId: string
  courseId: string
  moduleId: string
  lessonId: string
  status: "not-started" | "in-progress" | "completed"
  progress: number
  timeSpent: number
  lastAccessed: string
  attempts: number
  score?: number
}

export interface Assessment {
  id: string
  title: string
  description: string
  courseId: string
  moduleId?: string
  questions: Question[]
  timeLimit: number
  passingScore: number
  attempts: number
}

export interface Question {
  id: string
  type: "multiple-choice" | "multiple-select" | "short-answer" | "scenario"
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  criteria: {
    type: "lessons-completed" | "streak" | "score" | "time-spent"
    value: number
  }
}

// Database connection utilities
export class DatabaseService {
  static async getUser(id: string): Promise<User | null> {
    // Implementation would connect to actual database
    return null
  }

  static async updateUserProgress(userId: string, progress: Partial<UserProgress>): Promise<void> {
    // Implementation would update database
  }

  static async getCourse(id: string): Promise<Course | null> {
    // Implementation would fetch from database
    return null
  }

  static async getUserCourses(userId: string): Promise<Course[]> {
    // Implementation would fetch user's enrolled courses
    return []
  }
}
