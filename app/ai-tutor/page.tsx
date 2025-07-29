"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  Send,
  Lightbulb,
  BookOpen,
  Target,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  feedback?: "helpful" | "not-helpful"
  suggestions?: string[]
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content: `Hello! I'm your AI Prompt Engineering Tutor. I'm here to help you master the art of communicating with AI systems.

I can help you with:
• **Analyzing and improving your prompts**
• **Explaining prompt engineering concepts**
• **Providing personalized feedback**
• **Suggesting best practices**
• **Debugging problematic prompts**

What would you like to learn about today?`,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const quickTopics = [
    { id: "prompt-structure", label: "Prompt Structure", icon: <Target className="h-4 w-4" /> },
    { id: "few-shot", label: "Few-shot Learning", icon: <BookOpen className="h-4 w-4" /> },
    { id: "chain-of-thought", label: "Chain of Thought", icon: <Brain className="h-4 w-4" /> },
    { id: "debugging", label: "Prompt Debugging", icon: <Zap className="h-4 w-4" /> },
    { id: "best-practices", label: "Best Practices", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "model-differences", label: "Model Differences", icon: <Sparkles className="h-4 w-4" /> },
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase()

    if (input.includes("prompt") && input.includes("structure")) {
      return {
        content: `Great question about prompt structure! Here's the fundamental framework:

**The 4-Part Prompt Structure:**

1. **Context/Role** - Set the AI's perspective
   Example: "You are a professional copywriter..."

2. **Task/Instruction** - Clearly state what you want
   Example: "Write a compelling product description..."

3. **Constraints** - Define limitations and requirements
   Example: "Keep it under 100 words, focus on benefits..."

4. **Examples** (Optional) - Show desired output format
   Example: "Format: [Product Name] - [Benefit]. [Details]."

**Pro Tip:** Start with clear instructions, then add context and constraints as needed. The more specific you are, the better the results!

Would you like me to analyze a specific prompt you're working on?`,
        suggestions: [
          "Analyze my prompt for structure",
          "Show me examples of well-structured prompts",
          "How do I add better context to my prompts?",
        ],
      }
    }

    if (input.includes("few-shot") || input.includes("examples")) {
      return {
        content: `Few-shot prompting is one of the most powerful techniques! Here's how it works:

**Few-shot Learning = Learning from Examples**

Instead of just telling the AI what to do, you show it examples:

**Basic Prompt:**
"Classify the sentiment of this review"

**Few-shot Prompt:**
"Classify the sentiment of these reviews:

Review: 'Amazing product, love it!' → Positive
Review: 'Terrible quality, waste of money' → Negative
Review: 'It's okay, nothing special' → Neutral

Now classify: 'Best purchase I've made this year!'"

**Key Tips:**
• Use 2-5 examples (more isn't always better)
• Make examples diverse and representative
• Keep the format consistent
• Include edge cases if relevant

The AI learns the pattern from your examples and applies it to new inputs!`,
        suggestions: [
          "Help me create few-shot examples",
          "How many examples should I use?",
          "What makes a good example?",
        ],
      }
    }

    if (input.includes("debug") || input.includes("not working") || input.includes("wrong")) {
      return {
        content: `Let's debug that prompt! Here's my systematic approach:

**Prompt Debugging Checklist:**

🔍 **Clarity Issues:**
• Is your instruction specific enough?
• Are you using ambiguous words?
• Did you define key terms?

🎯 **Context Problems:**
• Does the AI have enough background info?
• Are you missing important constraints?
• Is the role/perspective clear?

📝 **Format Issues:**
• Did you specify the output format?
• Are your examples consistent?
• Is the structure logical?

🧪 **Testing Strategy:**
• Try the prompt with simpler inputs first
• Test one change at a time
• Compare results across different models

**Quick Fix:** Share your problematic prompt with me, and I'll help identify the specific issues!`,
        suggestions: [
          "Analyze my broken prompt",
          "Why is my prompt giving inconsistent results?",
          "How do I make my prompt more specific?",
        ],
      }
    }

    // Default response
    return {
      content: `I'd be happy to help you with that! Based on your question, here are some key points to consider:

• **Be Specific**: The more detailed your question, the better I can help
• **Share Examples**: If you have a prompt you're working on, feel free to share it
• **Context Matters**: Let me know what you're trying to achieve

What specific aspect of prompt engineering would you like to explore? I can provide detailed explanations, analyze your prompts, or walk through examples together.`,
      suggestions: [
        "Help me improve a specific prompt",
        "Explain prompt engineering basics",
        "Show me advanced techniques",
      ],
    }
  }

  const handleQuickTopic = (topicId: string) => {
    setSelectedTopic(topicId)
    const topic = quickTopics.find((t) => t.id === topicId)
    if (topic) {
      setInputMessage(`Tell me about ${topic.label.toLowerCase()}`)
    }
  }

  const handleFeedback = (messageId: string, feedback: "helpful" | "not-helpful") => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)))
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Tutor
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-purple-600 transition-colors">
              Courses
            </Link>
            <Link href="/ai-tutor" className="text-purple-600 font-medium">
              AI Tutor
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Quick Topics
                </CardTitle>
                <CardDescription>Get instant help on common topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickTopics.map((topic) => (
                  <Button
                    key={topic.id}
                    variant="outline"
                    className={`w-full justify-start bg-transparent ${
                      selectedTopic === topic.id ? "border-purple-300 bg-purple-50" : ""
                    }`}
                    onClick={() => handleQuickTopic(topic.id)}
                  >
                    {topic.icon}
                    <span className="ml-2">{topic.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Prompt Basics</span>
                    <Badge className="bg-green-100 text-green-700">Mastered</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Advanced Techniques</span>
                    <Badge className="bg-yellow-100 text-yellow-700">Learning</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Chain Building</span>
                    <Badge className="bg-gray-100">Not Started</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded bg-gray-50">
                    <p className="font-medium">Prompt Structure Help</p>
                    <p className="text-gray-500">2 hours ago</p>
                  </div>
                  <div className="p-2 rounded bg-gray-50">
                    <p className="font-medium">Few-shot Examples</p>
                    <p className="text-gray-500">Yesterday</p>
                  </div>
                  <div className="p-2 rounded bg-gray-50">
                    <p className="font-medium">Debugging Session</p>
                    <p className="text-gray-500">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">AI Prompt Engineering Tutor</CardTitle>
                    <CardDescription>Your personal guide to mastering AI communication</CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>

                        {/* AI Message Actions */}
                        {message.type === "ai" && (
                          <div className="mt-3 space-y-3">
                            {/* Suggestions */}
                            {message.suggestions && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600">💡 Try asking:</p>
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="mr-2 mb-2 text-xs bg-white hover:bg-purple-50"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}

                            {/* Feedback Buttons */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`text-xs ${
                                  message.feedback === "helpful" ? "text-green-600 bg-green-50" : "text-gray-500"
                                }`}
                                onClick={() => handleFeedback(message.id, "helpful")}
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Helpful
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`text-xs ${
                                  message.feedback === "not-helpful" ? "text-red-600 bg-red-50" : "text-gray-500"
                                }`}
                                onClick={() => handleFeedback(message.id, "not-helpful")}
                              >
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                Not Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span className="text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about prompt engineering..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Be specific about what you need help with for the best guidance
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
