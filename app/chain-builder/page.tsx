"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Plus, Play, Save, Share, Trash2, Copy, Zap, LinkIcon, GitBranch } from "lucide-react"
import Link from "next/link"

interface ChainNode {
  id: string
  type: "prompt" | "condition" | "transform" | "output"
  title: string
  content: string
  model?: string
  temperature?: number
  maxTokens?: number
  connections: string[]
  position: { x: number; y: number }
}

export default function ChainBuilderPage() {
  const [nodes, setNodes] = useState<ChainNode[]>([
    {
      id: "start",
      type: "prompt",
      title: "Initial Prompt",
      content: "Analyze the following text and extract key themes:",
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 500,
      connections: ["transform1"],
      position: { x: 100, y: 100 },
    },
    {
      id: "transform1",
      type: "transform",
      title: "Theme Extraction",
      content: "Transform the analysis into a structured list of themes with explanations",
      connections: ["condition1"],
      position: { x: 400, y: 100 },
    },
    {
      id: "condition1",
      type: "condition",
      title: "Quality Check",
      content: "If themes are comprehensive, proceed to summary. Otherwise, request more analysis.",
      connections: ["output1", "start"],
      position: { x: 700, y: 100 },
    },
    {
      id: "output1",
      type: "output",
      title: "Final Summary",
      content: "Generate a final summary report with themes and recommendations",
      connections: [],
      position: { x: 1000, y: 100 },
    },
  ])

  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [executionResults, setExecutionResults] = useState<{ [key: string]: string }>({})

  const addNode = (type: ChainNode["type"]) => {
    const newNode: ChainNode = {
      id: `node_${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      content: "",
      connections: [],
      position: { x: 200 + nodes.length * 50, y: 200 + nodes.length * 50 },
    }

    if (type === "prompt") {
      newNode.model = "gpt-4"
      newNode.temperature = 0.7
      newNode.maxTokens = 500
    }

    setNodes([...nodes, newNode])
  }

  const updateNode = (id: string, updates: Partial<ChainNode>) => {
    setNodes(nodes.map((node) => (node.id === id ? { ...node, ...updates } : node)))
  }

  const deleteNode = (id: string) => {
    setNodes(nodes.filter((node) => node.id !== id))
    // Remove connections to deleted node
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        connections: node.connections.filter((conn) => conn !== id),
      })),
    )
  }

  const connectNodes = (fromId: string, toId: string) => {
    setNodes(nodes.map((node) => (node.id === fromId ? { ...node, connections: [...node.connections, toId] } : node)))
  }

  const runChain = async () => {
    setIsRunning(true)
    setExecutionResults({})

    // Simulate chain execution
    const results: { [key: string]: string } = {}

    for (const node of nodes) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      switch (node.type) {
        case "prompt":
          results[node.id] =
            `Executed prompt: "${node.title}"\nModel: ${node.model}\nResult: Mock AI response for ${node.title}`
          break
        case "transform":
          results[node.id] = `Transformed data using: ${node.title}\nOutput: Structured transformation result`
          break
        case "condition":
          results[node.id] = `Evaluated condition: ${node.title}\nResult: Condition met, proceeding to next step`
          break
        case "output":
          results[node.id] = `Generated output: ${node.title}\nFinal result: Comprehensive analysis complete`
          break
      }

      setExecutionResults({ ...results })
    }

    setIsRunning(false)
  }

  const selectedNodeData = selectedNode ? nodes.find((n) => n.id === selectedNode) : null

  const getNodeIcon = (type: ChainNode["type"]) => {
    switch (type) {
      case "prompt":
        return <Brain className="h-4 w-4" />
      case "condition":
        return <GitBranch className="h-4 w-4" />
      case "transform":
        return <Zap className="h-4 w-4" />
      case "output":
        return <LinkIcon className="h-4 w-4" />
    }
  }

  const getNodeColor = (type: ChainNode["type"]) => {
    switch (type) {
      case "prompt":
        return "bg-purple-100 border-purple-300 text-purple-700"
      case "condition":
        return "bg-yellow-100 border-yellow-300 text-yellow-700"
      case "transform":
        return "bg-blue-100 border-blue-300 text-blue-700"
      case "output":
        return "bg-green-100 border-green-300 text-green-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Chain Builder
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/playground" className="text-gray-600 hover:text-purple-600 transition-colors">
              Playground
            </Link>
            <Link href="/chain-builder" className="text-purple-600 font-medium">
              Chain Builder
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button onClick={runChain} disabled={isRunning} className="bg-purple-600 hover:bg-purple-700">
              {isRunning ? "Running..." : "Run Chain"}
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Visual Prompt Chain Builder</h1>
          <p className="text-gray-600">Create complex multi-step AI workflows with visual connections</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Toolbox */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Components</CardTitle>
                <CardDescription>Drag or click to add new nodes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addNode("prompt")}
                >
                  <Brain className="mr-2 h-4 w-4 text-purple-600" />
                  Prompt Node
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addNode("transform")}
                >
                  <Zap className="mr-2 h-4 w-4 text-blue-600" />
                  Transform Node
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addNode("condition")}
                >
                  <GitBranch className="mr-2 h-4 w-4 text-yellow-600" />
                  Condition Node
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addNode("output")}
                >
                  <LinkIcon className="mr-2 h-4 w-4 text-green-600" />
                  Output Node
                </Button>
              </CardContent>
            </Card>

            {/* Node Properties */}
            {selectedNodeData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getNodeIcon(selectedNodeData.type)}
                    <span className="ml-2">Node Properties</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="node-title">Title</Label>
                    <Input
                      id="node-title"
                      value={selectedNodeData.title}
                      onChange={(e) => updateNode(selectedNodeData.id, { title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="node-content">Content</Label>
                    <Textarea
                      id="node-content"
                      value={selectedNodeData.content}
                      onChange={(e) => updateNode(selectedNodeData.id, { content: e.target.value })}
                      rows={4}
                    />
                  </div>

                  {selectedNodeData.type === "prompt" && (
                    <>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Select
                          value={selectedNodeData.model}
                          onValueChange={(value) => updateNode(selectedNodeData.id, { model: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                            <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="temperature">Temperature: {selectedNodeData.temperature}</Label>
                        <input
                          type="range"
                          id="temperature"
                          min="0"
                          max="2"
                          step="0.1"
                          value={selectedNodeData.temperature}
                          onChange={(e) =>
                            updateNode(selectedNodeData.id, { temperature: Number.parseFloat(e.target.value) })
                          }
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label htmlFor="max-tokens">Max Tokens: {selectedNodeData.maxTokens}</Label>
                        <input
                          type="range"
                          id="max-tokens"
                          min="100"
                          max="4000"
                          step="100"
                          value={selectedNodeData.maxTokens}
                          onChange={(e) =>
                            updateNode(selectedNodeData.id, { maxTokens: Number.parseInt(e.target.value) })
                          }
                          className="w-full"
                        />
                      </div>
                    </>
                  )}

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteNode(selectedNodeData.id)}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Node
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Chain Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent text-sm">
                  📝 Content Analysis Chain
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent text-sm">
                  🔍 Research & Summary Chain
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent text-sm">
                  ✍️ Creative Writing Chain
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent text-sm">
                  🧮 Data Processing Chain
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="canvas" className="space-y-6">
              <TabsList>
                <TabsTrigger value="canvas">Visual Canvas</TabsTrigger>
                <TabsTrigger value="code">Generated Code</TabsTrigger>
                <TabsTrigger value="results">Execution Results</TabsTrigger>
              </TabsList>

              <TabsContent value="canvas">
                <Card className="min-h-[600px]">
                  <CardContent className="p-6">
                    <div className="relative bg-gray-50 rounded-lg min-h-[550px] overflow-auto">
                      {/* Canvas Grid */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                          `,
                          backgroundSize: "20px 20px",
                        }}
                      />

                      {/* Nodes */}
                      {nodes.map((node) => (
                        <div
                          key={node.id}
                          className={`absolute p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${getNodeColor(
                            node.type,
                          )} ${selectedNode === node.id ? "ring-2 ring-purple-500" : ""}`}
                          style={{
                            left: node.position.x,
                            top: node.position.y,
                            width: "200px",
                          }}
                          onClick={() => setSelectedNode(node.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getNodeIcon(node.type)}
                              <span className="font-medium text-sm">{node.title}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {node.type}
                            </Badge>
                          </div>
                          <p className="text-xs opacity-75 line-clamp-2">{node.content}</p>

                          {/* Connection Points */}
                          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform -translate-y-1/2" />
                          <div className="absolute -left-2 top-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform -translate-y-1/2" />
                        </div>
                      ))}

                      {/* Connection Lines */}
                      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                        {nodes.map((node) =>
                          node.connections.map((connectionId) => {
                            const targetNode = nodes.find((n) => n.id === connectionId)
                            if (!targetNode) return null

                            const startX = node.position.x + 200
                            const startY = node.position.y + 50
                            const endX = targetNode.position.x
                            const endY = targetNode.position.y + 50

                            return (
                              <g key={`${node.id}-${connectionId}`}>
                                <line
                                  x1={startX}
                                  y1={startY}
                                  x2={endX}
                                  y2={endY}
                                  stroke="#8b5cf6"
                                  strokeWidth="2"
                                  markerEnd="url(#arrowhead)"
                                />
                              </g>
                            )
                          }),
                        )}
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                          </marker>
                        </defs>
                      </svg>

                      {/* Instructions */}
                      {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Start Building Your Chain</p>
                            <p className="text-sm">Add nodes from the toolbox to create your workflow</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Generated Chain Code
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto">
                      <pre>{`// Generated Prompt Chain Code
import { ChainExecutor } from '@promptmaster/chain-executor'

const chain = new ChainExecutor()

// Node: ${nodes[0]?.title || "Initial Prompt"}
const step1 = await chain.prompt({
  content: "${nodes[0]?.content || ""}",
  model: "${nodes[0]?.model || "gpt-4"}",
  temperature: ${nodes[0]?.temperature || 0.7},
  maxTokens: ${nodes[0]?.maxTokens || 500}
})

// Node: ${nodes[1]?.title || "Transform"}
const step2 = await chain.transform({
  input: step1.output,
  instruction: "${nodes[1]?.content || ""}"
})

// Node: ${nodes[2]?.title || "Condition"}
const step3 = await chain.condition({
  input: step2.output,
  condition: "${nodes[2]?.content || ""}",
  onTrue: () => chain.continue(),
  onFalse: () => chain.retry(step1)
})

// Node: ${nodes[3]?.title || "Output"}
const finalResult = await chain.output({
  input: step3.output,
  format: "${nodes[3]?.content || ""}"
})

export { finalResult }`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                <Card>
                  <CardHeader>
                    <CardTitle>Execution Results</CardTitle>
                    <CardDescription>
                      {isRunning ? "Chain is executing..." : "Results from the last chain execution"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isRunning ? (
                      <div className="space-y-4">
                        {nodes.map((node, index) => (
                          <div key={node.id} className="flex items-center space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                executionResults[node.id]
                                  ? "bg-green-500 text-white"
                                  : index === Object.keys(executionResults).length
                                    ? "bg-blue-500 text-white animate-pulse"
                                    : "bg-gray-200"
                              }`}
                            >
                              {executionResults[node.id] ? "✓" : index + 1}
                            </div>
                            <span className={executionResults[node.id] ? "text-green-600" : ""}>{node.title}</span>
                          </div>
                        ))}
                      </div>
                    ) : Object.keys(executionResults).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(executionResults).map(([nodeId, result]) => {
                          const node = nodes.find((n) => n.id === nodeId)
                          return (
                            <Card key={nodeId} className="bg-gray-50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center">
                                  {node && getNodeIcon(node.type)}
                                  <span className="ml-2">{node?.title}</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <pre className="text-xs whitespace-pre-wrap text-gray-700">{result}</pre>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No execution results yet</p>
                        <p className="text-sm">Run your chain to see the results here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
