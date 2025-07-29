import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, context, type } = body

    // Mock AI feedback - in production, integrate with actual AI service
    const feedback = generateMockFeedback(prompt, type)

    return NextResponse.json({
      success: true,
      data: {
        feedback,
        score: feedback.score,
        suggestions: feedback.suggestions,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate feedback",
      },
      { status: 500 },
    )
  }
}

function generateMockFeedback(prompt: string, type: string) {
  const wordCount = prompt.split(" ").length
  const hasContext = prompt.toLowerCase().includes("context") || prompt.includes("for")
  const hasSpecifics = prompt.includes("write") || prompt.includes("create") || prompt.includes("generate")
  const hasConstraints = /\d+/.test(prompt) || prompt.includes("word") || prompt.includes("sentence")

  let score = 60
  const suggestions = []
  const strengths = []

  // Analyze prompt quality
  if (hasContext) {
    score += 15
    strengths.push("Good context provided")
  } else {
    suggestions.push("Add more context about the target audience or use case")
  }

  if (hasSpecifics) {
    score += 10
    strengths.push("Clear action specified")
  } else {
    suggestions.push("Be more specific about what you want the AI to do")
  }

  if (hasConstraints) {
    score += 10
    strengths.push("Includes helpful constraints")
  } else {
    suggestions.push("Consider adding constraints like word count or format")
  }

  if (wordCount > 20) {
    score += 5
    strengths.push("Detailed instructions")
  } else {
    suggestions.push("Consider providing more detailed instructions")
  }

  return {
    score: Math.min(score, 100),
    strengths,
    suggestions,
    analysis: {
      clarity: score > 80 ? "Excellent" : score > 60 ? "Good" : "Needs improvement",
      specificity: hasSpecifics ? "High" : "Low",
      context: hasContext ? "Present" : "Missing",
    },
  }
}
