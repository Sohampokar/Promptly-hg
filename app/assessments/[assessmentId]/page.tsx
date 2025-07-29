"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, AlertCircle, Trophy } from "lucide-react"

interface Question {
  id: string
  type: "multiple-choice" | "multiple-select" | "short-answer" | "scenario"
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation: string
  points: number
}

const assessmentData = {
  "intro-quiz": {
    title: "Foundation Quiz",
    description: "Test your understanding of prompt engineering basics",
    timeLimit: 10,
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
      {
        id: "q2",
        type: "multiple-select",
        question: "Which elements make a prompt more effective? (Select all that apply)",
        options: ["Specific context", "Clear instructions", "Vague language", "Expected format", "Target audience"],
        correctAnswer: ["Specific context", "Clear instructions", "Expected format", "Target audience"],
        explanation:
          "Effective prompts include specific context, clear instructions, format expectations, and audience definition. Vague language should be avoided.",
        points: 15,
      },
      {
        id: "q3",
        type: "short-answer",
        question: "Explain in 2-3 sentences why specificity is important in prompt engineering.",
        correctAnswer:
          "Specificity helps AI models understand exactly what you want, reducing ambiguity and improving output quality. It provides clear constraints and context that guide the model toward the desired result.",
        explanation: "Specificity eliminates guesswork for the AI model and ensures more consistent, relevant results.",
        points: 15,
      },
      {
        id: "q4",
        type: "scenario",
        question:
          "You need to write a prompt for creating social media content for a local bakery. What key elements should you include?",
        options: [
          'Just ask for "social media content"',
          "Specify platform, tone, audience, and content type",
          "Only mention the bakery name",
          "Focus only on the product features",
        ],
        correctAnswer: "Specify platform, tone, audience, and content type",
        explanation:
          "Effective prompts for specific use cases should include platform requirements, appropriate tone, target audience, and content type specifications.",
        points: 10,
      },
    ] as Question[],
  },
}

export default function AssessmentPage({ params }: { params: { assessmentId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const assessment = assessmentData[params.assessmentId as keyof typeof assessmentData]

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const calculateScore = () => {
    let totalScore = 0
    let maxScore = 0

    assessment.questions.forEach((question) => {
      maxScore += question.points
      const userAnswer = answers[question.id]

      if (question.type === "multiple-choice" || question.type === "scenario") {
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points
        }
      } else if (question.type === "multiple-select") {
        const correct = question.correctAnswer as string[]
        const user = userAnswer || []
        if (JSON.stringify(correct.sort()) === JSON.stringify(user.sort())) {
          totalScore += question.points
        }
      } else if (question.type === "short-answer") {
        // Simple keyword matching for demo - in real app would use AI evaluation
        const keywords = ["specific", "clear", "context", "ambiguity", "quality"]
        const userText = (userAnswer || "").toLowerCase()
        const matchedKeywords = keywords.filter((keyword) => userText.includes(keyword))
        if (matchedKeywords.length >= 2) {
          totalScore += question.points
        }
      }
    })

    return Math.round((totalScore / maxScore) * 100)
  }

  const handleSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setIsSubmitted(true)
    setShowResults(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!assessment) {
    return <div>Assessment not found</div>
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {score >= assessment.passingScore ? (
                  <Trophy className="h-16 w-16 text-yellow-500" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {score >= assessment.passingScore ? "Congratulations!" : "Keep Learning!"}
              </CardTitle>
              <CardDescription>
                You scored {score}% on the {assessment.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{score}%</div>
                <Progress value={score} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">Passing score: {assessment.passingScore}%</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Question Review:</h3>
                {assessment.questions.map((question, index) => {
                  const userAnswer = answers[question.id]
                  const isCorrect =
                    question.type === "multiple-choice" || question.type === "scenario"
                      ? userAnswer === question.correctAnswer
                      : question.type === "multiple-select"
                        ? JSON.stringify((question.correctAnswer as string[]).sort()) ===
                          JSON.stringify((userAnswer || []).sort())
                        : true // Simplified for short-answer

                  return (
                    <Card
                      key={question.id}
                      className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start space-x-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">Question {index + 1}</p>
                            <p className="text-sm text-muted-foreground mb-2">{question.explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline">Review Lesson</Button>
                <Button>Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQ = assessment.questions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{assessment.title}</h1>
          <p className="text-muted-foreground">{assessment.description}</p>
        </div>

        {/* Timer and Progress */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 60 ? "text-red-500" : ""}`}>{formatTime(timeLeft)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / assessment.questions.length) * 100} />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{currentQ.type.replace("-", " ")}</Badge>
              <Badge variant="secondary">{currentQ.points} points</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {currentQ.type === "multiple-choice" || currentQ.type === "scenario" ? (
              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
              >
                {currentQ.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : currentQ.type === "multiple-select" ? (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${index}`}
                      checked={(answers[currentQ.id] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const current = answers[currentQ.id] || []
                        if (checked) {
                          handleAnswerChange(currentQ.id, [...current, option])
                        } else {
                          handleAnswerChange(
                            currentQ.id,
                            current.filter((item: string) => item !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <Textarea
                placeholder="Type your answer here..."
                value={answers[currentQ.id] || ""}
                onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                className="min-h-[100px]"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {currentQuestion < assessment.questions.length - 1 ? (
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={!answers[currentQ.id]}>
              Next Question
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={Object.keys(answers).length < assessment.questions.length}>
              Submit Assessment
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
