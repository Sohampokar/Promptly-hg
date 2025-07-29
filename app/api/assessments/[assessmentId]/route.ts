import { type NextRequest, NextResponse } from "next/server"

const assessments = {
  "intro-quiz": {
    id: "intro-quiz",
    title: "Foundation Quiz",
    description: "Test your understanding of prompt engineering basics",
    courseId: "foundation",
    moduleId: "intro-prompting",
    timeLimit: 600, // 10 minutes in seconds
    passingScore: 70,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is the primary goal of prompt engineering?",
        options: [
          "To make AI models faster",
          "To craft effective instructions for AI models",
          "To reduce AI model costs",
          "To replace human creativity",
        ],
        correctAnswer: "To craft effective instructions for AI models",
        explanation:
          "Prompt engineering focuses on creating clear, effective instructions that help AI models produce the desired output.",
        points: 10,
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { assessmentId: string } }) {
  const assessment = assessments[params.assessmentId as keyof typeof assessments]

  if (!assessment) {
    return NextResponse.json(
      {
        success: false,
        error: "Assessment not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: assessment,
  })
}

export async function POST(request: NextRequest, { params }: { params: { assessmentId: string } }) {
  try {
    const body = await request.json()
    const { answers, timeSpent } = body

    // Calculate score (simplified)
    const assessment = assessments[params.assessmentId as keyof typeof assessments]
    let score = 0
    let maxScore = 0

    assessment.questions.forEach((question) => {
      maxScore += question.points
      if (answers[question.id] === question.correctAnswer) {
        score += question.points
      }
    })

    const percentage = Math.round((score / maxScore) * 100)
    const passed = percentage >= assessment.passingScore

    return NextResponse.json({
      success: true,
      data: {
        score: percentage,
        passed,
        timeSpent,
        feedback: passed ? "Great job!" : "Keep practicing!",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit assessment",
      },
      { status: 500 },
    )
  }
}
