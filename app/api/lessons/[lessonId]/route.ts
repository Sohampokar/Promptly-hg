import { type NextRequest, NextResponse } from "next/server"

const lessons = {
  "what-is-prompting": {
    id: "what-is-prompting",
    title: "What is Prompt Engineering?",
    description: "Learn the fundamentals of prompt engineering",
    type: "theory",
    duration: 15,
    difficulty: "Beginner",
    courseId: "foundation",
    moduleId: "intro-prompting",
    content: {
      sections: [
        {
          id: "introduction",
          title: "What is Prompt Engineering?",
          type: "theory",
          content: "Prompt engineering is the art and science of crafting effective instructions for AI models...",
        },
      ],
    },
    prerequisites: [],
    learningObjectives: [
      "Define prompt engineering",
      "Understand the importance of clear instructions",
      "Identify components of effective prompts",
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { lessonId: string } }) {
  const lesson = lessons[params.lessonId as keyof typeof lessons]

  if (!lesson) {
    return NextResponse.json(
      {
        success: false,
        error: "Lesson not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: lesson,
  })
}
