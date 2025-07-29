import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const courses = [
  {
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
    instructor: "Dr. Sarah Chen",
    prerequisites: [],
    learningObjectives: [
      "Understand what prompt engineering is and why it matters",
      "Learn the anatomy of effective prompts",
      "Master basic prompting techniques",
      "Practice writing clear, specific instructions",
    ],
    modules_data: [
      {
        id: "intro-prompting",
        title: "Introduction to Prompting",
        lessons: 5,
        duration: "1 week",
        completed: false,
      },
    ],
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get("difficulty")
  const category = searchParams.get("category")

  let filteredCourses = courses

  if (difficulty) {
    filteredCourses = filteredCourses.filter((course) => course.difficulty.toLowerCase() === difficulty.toLowerCase())
  }

  return NextResponse.json({
    success: true,
    data: filteredCourses,
    total: filteredCourses.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCourse = {
      id: `course-${Date.now()}`,
      ...body,
      enrolled: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
    }

    courses.push(newCourse)

    return NextResponse.json(
      {
        success: true,
        data: newCourse,
        message: "Course created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create course",
      },
      { status: 500 },
    )
  }
}
