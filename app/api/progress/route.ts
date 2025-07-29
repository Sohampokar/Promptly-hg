import { type NextRequest, NextResponse } from "next/server"

// Mock user progress data
const userProgress = {
  userId: "user-123",
  courses: {
    foundation: {
      courseId: "foundation",
      progress: 75,
      completedLessons: ["what-is-prompting", "ai-models-basics", "first-prompt"],
      currentLesson: "prompt-examples",
      timeSpent: 180, // minutes
      xpEarned: 1350,
      lastAccessed: new Date().toISOString(),
    },
  },
  totalXp: 1350,
  level: 3,
  streak: 7,
  achievements: ["first-lesson", "week-streak", "theory-master"],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "user-123"
  const courseId = searchParams.get("courseId")

  if (courseId) {
    const courseProgress = userProgress.courses[courseId as keyof typeof userProgress.courses]
    return NextResponse.json({
      success: true,
      data: courseProgress || null,
    })
  }

  return NextResponse.json({
    success: true,
    data: userProgress,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, courseId, lessonId, action } = body

    if (action === "complete-lesson") {
      // Update progress
      if (userProgress.courses[courseId]) {
        const course = userProgress.courses[courseId]
        if (!course.completedLessons.includes(lessonId)) {
          course.completedLessons.push(lessonId)
          course.xpEarned += 100 // Award XP
          userProgress.totalXp += 100
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: userProgress,
      message: "Progress updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update progress",
      },
      { status: 500 },
    )
  }
}
