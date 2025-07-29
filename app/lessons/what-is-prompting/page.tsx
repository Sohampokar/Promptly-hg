"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Clock, CheckCircle, ArrowRight, ArrowLeft, Lightbulb, Target } from "lucide-react"
import Link from "next/link"

export default function WhatIsPromptingLesson() {
  const [currentSection, setCurrentSection] = useState(0)
  const [userPrompt, setUserPrompt] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const sections = [
    {
      id: "introduction",
      title: "What is Prompt Engineering?",
      type: "theory",
      content: (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Understanding Prompt Engineering</h2>
            <p className="text-lg leading-relaxed mb-6">
              Prompt engineering is the art and science of crafting effective instructions for AI models. Think of it as
              learning to communicate with artificial intelligence in a way that produces the exact results you want.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                Key Concept
              </h3>
              <p>
                A prompt is like giving directions to a very intelligent assistant. The clearer and more specific your
                directions, the better the results you'll get.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Why is Prompt Engineering Important?</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>
                  <strong>Precision:</strong> Get exactly the output you need
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>
                  <strong>Efficiency:</strong> Save time by getting it right the first time
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>
                  <strong>Consistency:</strong> Reproducible results across different tasks
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>
                  <strong>Creativity:</strong> Unlock the full potential of AI models
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "examples",
      title: "Good vs Bad Prompts",
      type: "example",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Comparing Prompt Quality</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">❌ Poor Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <code className="text-sm">"Write about marketing"</code>
                </div>
                <h4 className="font-semibold mb-2">Problems:</h4>
                <ul className="text-sm space-y-1 text-red-600">
                  <li>• Too vague and general</li>
                  <li>• No specific context</li>
                  <li>• Unclear expectations</li>
                  <li>• No format specified</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600">✅ Good Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <code className="text-sm">
                    "Write a 300-word blog post introduction about email marketing for small businesses. Include 3 key
                    benefits and use a conversational tone. Target audience: business owners with 1-10 employees."
                  </code>
                </div>
                <h4 className="font-semibold mb-2">Strengths:</h4>
                <ul className="text-sm space-y-1 text-green-600">
                  <li>• Specific word count</li>
                  <li>• Clear topic and audience</li>
                  <li>• Defined structure (3 benefits)</li>
                  <li>• Tone specification</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-yellow-600" />
              The Difference
            </h3>
            <p>
              The good prompt provides context, constraints, and clear expectations. This leads to focused, relevant
              output that matches your needs exactly.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "practice",
      title: "Try It Yourself",
      type: "practice",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Practice Writing Prompts</h2>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Exercise: Write a Recipe Prompt</h3>
            <p className="mb-4">
              Your task is to write a prompt that asks for a healthy dinner recipe. Try to include specific requirements
              like cooking time, dietary restrictions, and serving size.
            </p>
          </div>

          <div className="space-y-4">
            <label htmlFor="prompt-input" className="block text-sm font-medium">
              Your Prompt:
            </label>
            <Textarea
              id="prompt-input"
              placeholder="Write your prompt here..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="min-h-[120px]"
            />
            <Button onClick={() => setShowFeedback(true)} disabled={!userPrompt.trim()}>
              Get Feedback
            </Button>
          </div>

          {showFeedback && (
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600">Feedback on Your Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Analysis:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Good specificity in requirements</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Clear context provided</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Improvement Suggestions:</h4>
                    <p className="text-sm">
                      Consider adding format requirements (like ingredient list structure) and any specific cooking
                      methods you prefer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Link href="/learning-path" className="hover:underline">
              Learning Path
            </Link>
            <span>/</span>
            <Link href="/learning-path" className="hover:underline">
              Foundation Track
            </Link>
            <span>/</span>
            <span>What is Prompt Engineering?</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">What is Prompt Engineering?</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>15 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Theory Lesson</span>
            </div>
            <Badge variant="outline">Beginner</Badge>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Lesson Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentSection + 1} of {sections.length}
              </span>
            </div>
            <Progress value={((currentSection + 1) / sections.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {currentSection + 1}
              </span>
              <span>{sections[currentSection].title}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{sections[currentSection].type}</Badge>
            </div>
          </CardHeader>
          <CardContent>{sections[currentSection].content}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index <= currentSection ? "bg-primary" : "bg-gray-200"}`}
              />
            ))}
          </div>

          {currentSection < sections.length - 1 ? (
            <Button onClick={() => setCurrentSection(currentSection + 1)}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Link href="/lessons/ai-models-basics">
              <Button>
                Complete Lesson
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
