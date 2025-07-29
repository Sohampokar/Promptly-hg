"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Play,
  Lightbulb,
  Target,
  MessageSquare,
  Star,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function InteractiveLessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string

  const [currentStep, setCurrentStep] = useState(0)
  const [userPrompt, setUserPrompt] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ score: number; suggestions: string[] } | null>(null)
  const [lessonProgress, setLessonProgress] = useState(25)

  // Mock lesson data
  const lesson = {
    id: "prompt-anatomy-basics",
    title: "Understanding Prompt Anatomy",
    description: "Learn the essential components that make prompts effective",
    course: "Foundation Track",
    module: "Module 3: Prompt Anatomy",
    duration: "18 min",
    difficulty: "Beginner",
    objectives: [
      "Identify the key components of a well-structured prompt",
      "Write clear instructions and provide context",
      "Use examples effectively in your prompts",
      "Avoid common prompting mistakes",
    ],
    steps: [
      {
        type: "theory",
        title: "The Three Pillars of Effective Prompts",
        content: `Every effective prompt consists of three essential components:

**1. Clear Instructions** - Tell the AI exactly what you want it to do
**2. Relevant Context** - Provide background information and constraints  
**3. Examples (Optional)** - Show the AI the desired output format

Let's break down each component:

### Clear Instructions
Your instruction should be specific and actionable. Instead of "write something about dogs," try "write a 200-word informative paragraph about dog training techniques for puppies."

### Relevant Context
Context helps the AI understand the situation. For example: "You are a professional dog trainer with 10 years of experience writing for new pet owners."

### Examples
Examples show the AI exactly what you want. This is especially powerful for formatting and style consistency.`,
        interactive: false,
      },
      {
        type: "example",
        title: "Anatomy in Action",
        content: `Let's examine a well-structured prompt:

**Context:** "You are a marketing copywriter for a tech startup."

**Instruction:** "Write a compelling product description for our new AI-powered productivity app."

**Constraints:** "Keep it under 100 words, focus on benefits not features, and include a call-to-action."

**Example:** "Like this format: [Product Name] - [Main Benefit]. [Supporting details]. [Call-to-action]."

Notice how each component serves a specific purpose in guiding the AI toward the desired output.`,
        interactive: false,
      },
      {
        type: "practice",
        title: "Your Turn: Build a Prompt",
        content: `Now it's your turn! Create a prompt for this scenario:

**Scenario:** You need help writing a professional email to decline a job offer politely.

Use the three-pillar structure:
1. Set the context (who you are, situation)
2. Give clear instructions (what type of email, key points to include)
3. Add any constraints (tone, length, specific requirements)

Write your prompt in the text area below:`,
        interactive: true,
        expectedElements: ["context", "instruction", "constraints"],
        hints: [
          "Start by setting the context - who are you in this situation?",
          "Be specific about what the email should accomplish",
          "Consider the tone and length requirements",
        ],
      },
      {
        type: "feedback",
        title: "AI Feedback & Improvement",
        content: `Great work! Let's see how your prompt performs and get personalized feedback.

The AI will evaluate your prompt based on:
- **Clarity** - Are your instructions clear and specific?
- **Context** - Did you provide sufficient background?
- **Structure** - Is your prompt well-organized?
- **Completeness** - Does it include all necessary elements?

Click "Get AI Feedback" to see how you did and receive suggestions for improvement.`,
        interactive: true,
      },
    ],
  }

  const handlePromptSubmit = async () => {
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const mockResponse = `Subject: Thank You for the Opportunity - Job Offer Decision

Dear [Hiring Manager's Name],

Thank you so much for offering me the [Position Title] role at [Company Name]. I truly appreciate the time you and your team invested in the interview process and the confidence you've shown in my abilities.

After careful consideration, I have decided to decline this offer as I have accepted another position that aligns more closely with my current career goals and personal circumstances.

I was genuinely impressed by [Company Name]'s mission and the team I met during the interview process. I hope we might have the opportunity to work together in the future.

Thank you again for your understanding, and I wish you and the team continued success.

Best regards,
[Your Name]`

      setAiResponse(mockResponse)

      // Mock AI feedback
      const mockFeedback = {
        score: 85,
        suggestions: [
          "Great job including context about being a job candidate!",
          "Your instruction was clear and specific about the email's purpose.",
          "Consider adding constraints about tone (professional, grateful) for even better results.",
          "You could specify the email length to ensure conciseness.",
        ],
      }

      setFeedback(mockFeedback)
      setIsLoading(false)
    }, 2000)
  }

  const handleNextStep = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setLessonProgress(((currentStep + 2) / lesson.steps.length) * 100)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setLessonProgress((currentStep / lesson.steps.length) * 100)
    }
  }

  const currentStepData = lesson.steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/courses/foundation">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PromptMaster
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-700">{lesson.difficulty}</Badge>
            <span className="text-sm text-gray-600">{lesson.duration}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Lesson Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{lesson.course}</Badge>
                  <span className="text-sm text-gray-500">
                    Step {currentStep + 1} of {lesson.steps.length}
                  </span>
                </div>
                <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(lessonProgress)}%</span>
                  </div>
                  <Progress value={lessonProgress} className="h-2" />
                </div>
              </CardHeader>
            </Card>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {currentStepData.type === "theory" && <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />}
                  {currentStepData.type === "example" && <Target className="mr-2 h-5 w-5 text-blue-500" />}
                  {currentStepData.type === "practice" && <Play className="mr-2 h-5 w-5 text-green-500" />}
                  {currentStepData.type === "feedback" && <MessageSquare className="mr-2 h-5 w-5 text-purple-500" />}
                  {currentStepData.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700">{currentStepData.content}</div>
                </div>

                {/* Interactive Elements */}
                {currentStepData.interactive && currentStepData.type === "practice" && (
                  <div className="mt-6 space-y-4">
                    <Separator />
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Prompt:</label>
                      <Textarea
                        placeholder="Write your prompt here..."
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    {currentStepData.hints && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-blue-800 mb-2">💡 Hints:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {currentStepData.hints.map((hint, index) => (
                              <li key={index}>• {hint}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    <Button
                      onClick={handlePromptSubmit}
                      disabled={!userPrompt.trim() || isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      Test Your Prompt
                    </Button>

                    {/* AI Response */}
                    {aiResponse && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">AI Response</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <pre className="whitespace-pre-wrap text-sm">{aiResponse}</pre>
                          </div>
                          <Button variant="outline" size="sm">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Response
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* AI Feedback Section */}
                {currentStepData.interactive && currentStepData.type === "feedback" && (
                  <div className="mt-6 space-y-4">
                    <Separator />
                    <Button
                      onClick={handlePromptSubmit}
                      disabled={!userPrompt.trim() || isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <MessageSquare className="mr-2 h-4 w-4" />
                      )}
                      Get AI Feedback
                    </Button>

                    {feedback && (
                      <Card className="border-purple-200">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Star className="mr-2 h-5 w-5 text-yellow-500" />
                            Your Prompt Score: {feedback.score}/100
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Progress value={feedback.score} className="h-3" />

                            <div>
                              <h4 className="font-medium mb-2">Feedback & Suggestions:</h4>
                              <ul className="space-y-2">
                                {feedback.suggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                Helpful
                              </Button>
                              <Button variant="outline" size="sm">
                                <ThumbsDown className="mr-2 h-4 w-4" />
                                Not Helpful
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep === lesson.steps.length - 1 ? (
                <Link href="/courses/foundation">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Lesson
                  </Button>
                </Link>
              ) : (
                <Button onClick={handleNextStep} className="bg-purple-600 hover:bg-purple-700">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lesson Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lesson.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        index === currentStep ? "bg-purple-50 border border-purple-200" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          index < currentStep
                            ? "bg-green-500 text-white"
                            : index === currentStep
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index < currentStep ? "✓" : index + 1}
                      </div>
                      <span className={`text-sm ${index === currentStep ? "font-medium" : ""}`}>{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI Tutor
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Brain className="mr-2 h-4 w-4" />
                  Community Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
