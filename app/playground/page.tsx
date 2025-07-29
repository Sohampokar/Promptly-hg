"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Brain, Play, Save, Share, Copy, RefreshCw, Settings, Zap, Clock, DollarSign, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1000])
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{ [key: string]: string }>({})

  const models = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI", cost: "$0.03/1K tokens" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", cost: "$0.002/1K tokens" },
    { id: "claude-3", name: "Claude 3", provider: "Anthropic", cost: "$0.015/1K tokens" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google", cost: "$0.001/1K tokens" },
  ]

  const promptTemplates = [
    {
      name: "Creative Writing",
      prompt:
        "Write a short story about a time traveler who discovers that changing the past has unexpected consequences. Make it engaging and thought-provoking.",
      system:
        "You are a creative writing assistant. Focus on compelling narratives, character development, and plot twists.",
    },
    {
      name: "Code Review",
      prompt:
        "Review this Python function and suggest improvements:\n\ndef calculate_average(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total / len(numbers)",
      system:
        "You are a senior software engineer. Provide constructive feedback on code quality, performance, and best practices.",
    },
    {
      name: "Marketing Copy",
      prompt:
        "Create compelling marketing copy for a new AI-powered productivity app that helps remote teams collaborate better. Include a headline, subheading, and 3 key benefits.",
      system:
        "You are a marketing copywriter. Focus on benefits over features, use persuasive language, and create urgency.",
    },
    {
      name: "Data Analysis",
      prompt:
        "Analyze this sales data and provide insights:\nQ1: $125,000\nQ2: $150,000\nQ3: $135,000\nQ4: $180,000\n\nWhat trends do you see and what recommendations would you make?",
      system:
        "You are a data analyst. Provide clear insights, identify patterns, and make actionable recommendations based on data.",
    },
  ]

  const handleRunPrompt = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockResponse = `This is a simulated response from ${models.find((m) => m.id === selectedModel)?.name}. 

In a real implementation, this would be the actual AI model response based on your prompt: "${prompt.substring(0, 50)}..."

The response would vary based on:
- Model selection: ${selectedModel}
- Temperature: ${temperature[0]}
- Max tokens: ${maxTokens[0]}
- System prompt: ${systemPrompt ? "Custom system prompt provided" : "Default system prompt"}

This playground would integrate with actual AI APIs to provide real responses.`

      setResults({
        [selectedModel]: mockResponse,
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleCompareModels = async () => {
    setIsLoading(true)

    // Simulate API calls to multiple models
    setTimeout(() => {
      const mockResults: { [key: string]: string } = {}

      models.forEach((model) => {
        mockResults[model.id] = `Response from ${model.name}:

This is how ${model.name} would respond to your prompt. Each model has different strengths:

${model.id === "gpt-4" ? "- Excellent reasoning and complex task handling\n- More creative and nuanced responses\n- Better at following complex instructions" : ""}
${model.id === "gpt-3.5-turbo" ? "- Fast and cost-effective\n- Good for straightforward tasks\n- Reliable for most use cases" : ""}
${model.id === "claude-3" ? "- Strong analytical capabilities\n- Excellent at long-form content\n- Great safety and helpfulness" : ""}
${model.id === "gemini-pro" ? "- Multimodal capabilities\n- Good reasoning abilities\n- Cost-effective option" : ""}

Your prompt: "${prompt.substring(0, 100)}..."`
      })

      setResults(mockResults)
      setIsLoading(false)
    }, 3000)
  }

  const loadTemplate = (template: (typeof promptTemplates)[0]) => {
    setPrompt(template.prompt)
    setSystemPrompt(template.system)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PromptMaster
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-purple-600 transition-colors">
              Courses
            </Link>
            <Link href="/playground" className="text-purple-600 font-medium">
              Playground
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-purple-600 transition-colors">
              Community
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Playground</h1>
          <p className="text-gray-600">Test and compare prompts across different AI models</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{model.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {model.provider}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">{models.find((m) => m.id === selectedModel)?.cost}</p>
                </div>

                <div>
                  <Label>Temperature: {temperature[0]}</Label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={2}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Controls randomness (0 = focused, 2 = creative)</p>
                </div>

                <div>
                  <Label>Max Tokens: {maxTokens[0]}</Label>
                  <Slider
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    max={4000}
                    min={100}
                    step={100}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum response length</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
                <CardDescription>Start with proven prompt patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {promptTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => loadTemplate(template)}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prompt Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="system-prompt">System Prompt (Optional)</Label>
                  <Textarea
                    id="system-prompt"
                    placeholder="Define the AI's role and behavior..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="user-prompt">User Prompt</Label>
                  <Textarea
                    id="user-prompt"
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleRunPrompt}
                    disabled={!prompt.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    Run Prompt
                  </Button>

                  <Button onClick={handleCompareModels} disabled={!prompt.trim() || isLoading} variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Compare Models
                  </Button>

                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>

                  <Button variant="outline">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {Object.keys(results).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(results).length === 1 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-700">
                          {models.find((m) => m.id === selectedModel)?.name}
                        </Badge>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            2.3s
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4" />
                            $0.05
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm">{results[selectedModel]}</pre>
                      </div>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Response
                      </Button>
                    </div>
                  ) : (
                    <Tabs defaultValue={Object.keys(results)[0]}>
                      <TabsList className="grid w-full grid-cols-4">
                        {Object.keys(results).map((modelId) => (
                          <TabsTrigger key={modelId} value={modelId}>
                            {models.find((m) => m.id === modelId)?.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {Object.entries(results).map(([modelId, response]) => (
                        <TabsContent key={modelId} value={modelId} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-blue-100 text-blue-700">
                              {models.find((m) => m.id === modelId)?.name}
                            </Badge>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {Math.random() * 3 + 1}s
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="mr-1 h-4 w-4" />${(Math.random() * 0.1).toFixed(3)}
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="whitespace-pre-wrap text-sm">{response}</pre>
                          </div>
                          <Button variant="outline" size="sm">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Response
                          </Button>
                        </TabsContent>
                      ))}
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use specific, clear instructions for better results</li>
                  <li>• Experiment with different temperature settings</li>
                  <li>• System prompts help define the AI's role and behavior</li>
                  <li>• Compare models to find the best fit for your use case</li>
                  <li>• Save successful prompts for future reference</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
