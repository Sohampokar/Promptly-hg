// AI integration service
export class AIService {
  static async analyzePrompt(prompt: string, context?: string) {
    // In production, integrate with actual AI service (OpenAI, Anthropic, etc.)
    const analysis = {
      clarity: this.assessClarity(prompt),
      specificity: this.assessSpecificity(prompt),
      context: this.assessContext(prompt),
      structure: this.assessStructure(prompt),
      suggestions: this.generateSuggestions(prompt),
    }

    const overallScore = Math.round(
      (analysis.clarity + analysis.specificity + analysis.context + analysis.structure) / 4,
    )

    return {
      score: overallScore,
      analysis,
      feedback: this.generateFeedback(analysis),
      improvedVersion: this.generateImprovedPrompt(prompt, analysis),
    }
  }

  private static assessClarity(prompt: string): number {
    const hasAction = /\b(write|create|generate|analyze|explain|summarize)\b/i.test(prompt)
    const hasSubject = prompt.length > 10
    const isSpecific = prompt.split(" ").length > 5

    let score = 50
    if (hasAction) score += 20
    if (hasSubject) score += 15
    if (isSpecific) score += 15

    return Math.min(score, 100)
  }

  private static assessSpecificity(prompt: string): number {
    const hasNumbers = /\d+/.test(prompt)
    const hasFormat = /\b(format|style|tone|length)\b/i.test(prompt)
    const hasConstraints = /\b(must|should|include|avoid)\b/i.test(prompt)

    let score = 40
    if (hasNumbers) score += 20
    if (hasFormat) score += 20
    if (hasConstraints) score += 20

    return Math.min(score, 100)
  }

  private static assessContext(prompt: string): number {
    const hasAudience = /\b(for|audience|users|customers|students)\b/i.test(prompt)
    const hasPurpose = /\b(to|in order to|because|since)\b/i.test(prompt)
    const hasBackground = prompt.length > 50

    let score = 30
    if (hasAudience) score += 25
    if (hasPurpose) score += 25
    if (hasBackground) score += 20

    return Math.min(score, 100)
  }

  private static assessStructure(prompt: string): number {
    const hasSteps = /\b(first|then|next|finally|step)\b/i.test(prompt)
    const hasExamples = /\b(example|like|such as)\b/i.test(prompt)
    const isOrganized = prompt.includes("\n") || prompt.includes(".")

    let score = 50
    if (hasSteps) score += 20
    if (hasExamples) score += 15
    if (isOrganized) score += 15

    return Math.min(score, 100)
  }

  private static generateSuggestions(prompt: string): string[] {
    const suggestions = []

    if (prompt.length < 20) {
      suggestions.push("Add more detail to your prompt")
    }

    if (!/\b(write|create|generate)\b/i.test(prompt)) {
      suggestions.push("Start with a clear action verb (write, create, generate)")
    }

    if (!/\d+/.test(prompt)) {
      suggestions.push("Consider adding specific numbers (word count, items, etc.)")
    }

    if (!/\b(for|audience)\b/i.test(prompt)) {
      suggestions.push("Specify your target audience")
    }

    return suggestions
  }

  private static generateFeedback(analysis: any): string {
    const avgScore = (analysis.clarity + analysis.specificity + analysis.context + analysis.structure) / 4

    if (avgScore >= 80) {
      return "Excellent prompt! Your instructions are clear, specific, and well-structured."
    } else if (avgScore >= 60) {
      return "Good prompt with room for improvement. Consider adding more context or constraints."
    } else {
      return "This prompt needs work. Focus on clarity, specificity, and providing more context."
    }
  }

  private static generateImprovedPrompt(prompt: string, analysis: any): string {
    // Simple improvement suggestions - in production, use AI to generate better versions
    let improved = prompt

    if (analysis.clarity < 70) {
      improved = `Please ${improved.toLowerCase()}`
    }

    if (analysis.context < 70) {
      improved += " for a professional audience"
    }

    if (analysis.specificity < 70) {
      improved += " in approximately 200 words"
    }

    return improved
  }
}
