import { type NextRequest, NextResponse } from "next/server"

const courseDetails = {
  foundation: {
    id: "foundation",
    title: "Foundation Track",
    description: "Master the fundamentals of prompt engineering",
    difficulty: "Beginner",
    duration: "4-6 weeks",
    modules: 4,
    lessons: 18,
    xp: 1800,
    enrolled: 15420,
    rating: 4.8,
    instructor: {
      name: "Dr. Sarah Chen",
      bio: "AI Research Scientist with 10+ years experience",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    syllabus: [
      {
        id: "intro-prompting",
        title: "Introduction to Prompting",
        lessons: [
          { id: "what-is-prompting", title: "What is Prompt Engineering?", duration: "15 min", type: "theory" },
          { id: "ai-models-basics", title: "Understanding AI Models", duration: "20 min", type: "theory" },
          { id: "first-prompt", title: "Writing Your First Prompt", duration: "25 min", type: "practice" },
        ],
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  const course = courseDetails[params.courseId as keyof typeof courseDetails]

  if (!course) {
    return NextResponse.json(
      {
        success: false,
        error: "Course not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: course,
  })
}

export async function PUT(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const body = await request.json()

    // In a real app, update the course in the database
    const updatedCourse = {
      ...courseDetails[params.courseId as keyof typeof courseDetails],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update course",
      },
      { status: 500 },
    )
  }
}
