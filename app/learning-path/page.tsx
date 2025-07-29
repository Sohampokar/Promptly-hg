"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Trophy, Lock, CheckCircle, PlayCircle } from "lucide-react"
import Link from "next/link"

const learningTracks = [
  {
    id: "foundation",
    title: "Foundation Track",
    description: "Master the fundamentals of prompt engineering",
    duration: "4-6 weeks",
    difficulty: "Beginner",
    modules: 4,
    lessons: 18,
    xp: 1800,
    color: "bg-green-500",
    progress: 75,
    unlocked: true,
    modules_data: [
      {
        id: "intro-prompting",
        title: "Introduction to Prompting",
        lessons: 5,
        duration: "1 week",
        completed: true,
        lessons_list: [
          {
            id: "what-is-prompting",
            title: "What is Prompt Engineering?",
            type: "theory",
            duration: "15 min",
            completed: true,
          },
          {
            id: "ai-models-basics",
            title: "Understanding AI Models",
            type: "theory",
            duration: "20 min",
            completed: true,
          },
          {
            id: "first-prompt",
            title: "Writing Your First Prompt",
            type: "practice",
            duration: "25 min",
            completed: true,
          },
          {
            id: "prompt-examples",
            title: "Analyzing Good Prompts",
            type: "example",
            duration: "20 min",
            completed: true,
          },
          { id: "intro-quiz", title: "Foundation Quiz", type: "assessment", duration: "10 min", completed: true },
        ],
      },
      {
        id: "prompt-anatomy",
        title: "Anatomy of a Prompt",
        lessons: 4,
        duration: "1 week",
        completed: true,
        lessons_list: [
          { id: "prompt-components", title: "Prompt Components", type: "theory", duration: "18 min", completed: true },
          { id: "context-setting", title: "Setting Context", type: "practice", duration: "22 min", completed: true },
          {
            id: "instruction-clarity",
            title: "Clear Instructions",
            type: "practice",
            duration: "20 min",
            completed: false,
          },
          {
            id: "anatomy-assessment",
            title: "Anatomy Assessment",
            type: "assessment",
            duration: "15 min",
            completed: false,
          },
        ],
      },
      {
        id: "basic-techniques",
        title: "Basic Techniques",
        lessons: 5,
        duration: "1-2 weeks",
        completed: false,
        lessons_list: [
          { id: "zero-shot", title: "Zero-Shot Prompting", type: "theory", duration: "20 min", completed: false },
          { id: "few-shot", title: "Few-Shot Learning", type: "theory", duration: "25 min", completed: false },
          { id: "chain-of-thought", title: "Chain of Thought", type: "practice", duration: "30 min", completed: false },
          { id: "prompt-templates", title: "Using Templates", type: "practice", duration: "20 min", completed: false },
          { id: "techniques-quiz", title: "Techniques Quiz", type: "assessment", duration: "15 min", completed: false },
        ],
      },
      {
        id: "practice-arena-1",
        title: "Practice Arena Level 1",
        lessons: 4,
        duration: "1 week",
        completed: false,
        lessons_list: [
          {
            id: "writing-prompts",
            title: "Writing Effective Prompts",
            type: "practice",
            duration: "30 min",
            completed: false,
          },
          {
            id: "prompt-iteration",
            title: "Iterating on Prompts",
            type: "practice",
            duration: "25 min",
            completed: false,
          },
          {
            id: "common-mistakes",
            title: "Avoiding Common Mistakes",
            type: "example",
            duration: "20 min",
            completed: false,
          },
          {
            id: "foundation-capstone",
            title: "Foundation Capstone",
            type: "project",
            duration: "45 min",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "intermediate",
    title: "Control & Creativity Track",
    description: "Advanced techniques for precise and creative prompting",
    duration: "6-8 weeks",
    difficulty: "Intermediate",
    modules: 5,
    lessons: 22,
    xp: 2800,
    color: "bg-blue-500",
    progress: 25,
    unlocked: true,
    modules_data: [
      {
        id: "advanced-structures",
        title: "Advanced Prompt Structures",
        lessons: 5,
        duration: "1-2 weeks",
        completed: false,
        lessons_list: [
          {
            id: "structured-prompts",
            title: "Structured Prompting",
            type: "theory",
            duration: "25 min",
            completed: true,
          },
          {
            id: "conditional-logic",
            title: "Conditional Logic in Prompts",
            type: "practice",
            duration: "30 min",
            completed: false,
          },
          {
            id: "nested-prompts",
            title: "Nested Prompt Techniques",
            type: "practice",
            duration: "35 min",
            completed: false,
          },
          { id: "prompt-chaining", title: "Prompt Chaining", type: "theory", duration: "28 min", completed: false },
          {
            id: "structures-assessment",
            title: "Structures Assessment",
            type: "assessment",
            duration: "20 min",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    title: "Optimization & Automation Track",
    description: "Master optimization, debugging, and automation",
    duration: "8-10 weeks",
    difficulty: "Advanced",
    modules: 5,
    lessons: 20,
    xp: 3500,
    color: "bg-purple-500",
    progress: 0,
    unlocked: false,
    modules_data: [],
  },
]

const roleSpecializations = [
  {
    id: "developer",
    title: "Developer Track",
    description: "Code generation, API integration, technical documentation",
    icon: "💻",
    lessons: 15,
    duration: "4-6 weeks",
    unlocked: false,
  },
  {
    id: "marketer",
    title: "Marketing Track",
    description: "Content creation, copywriting, campaign development",
    icon: "📈",
    lessons: 12,
    duration: "3-5 weeks",
    unlocked: false,
  },
  {
    id: "researcher",
    title: "Research Track",
    description: "Academic writing, data analysis, literature reviews",
    icon: "🔬",
    lessons: 14,
    duration: "4-6 weeks",
    unlocked: false,
  },
  {
    id: "entrepreneur",
    title: "Business Track",
    description: "Business planning, strategy, innovation frameworks",
    icon: "🚀",
    lessons: 13,
    duration: "4-5 weeks",
    unlocked: false,
  },
]

export default function LearningPath() {
  const [selectedTrack, setSelectedTrack] = useState("foundation")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Your Learning Journey</h1>
        <p className="text-xl text-muted-foreground">
          Master prompt engineering from beginner to expert with our comprehensive curriculum
        </p>
      </div>

      <Tabs value={selectedTrack} onValueChange={setSelectedTrack} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="foundation">Foundation</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {learningTracks.map((track) => (
          <TabsContent key={track.id} value={track.id} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{track.title}</CardTitle>
                    <CardDescription className="text-lg">{track.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={track.unlocked ? "default" : "secondary"}>{track.difficulty}</Badge>
                    {track.unlocked ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Lock className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{track.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{track.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>{track.xp} XP</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{track.progress}%</span>
                  </div>
                  <Progress value={track.progress} className="h-2" />
                </div>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {track.modules_data.map((module, index) => (
                <Card key={module.id} className={`${!track.unlocked ? "opacity-50" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{module.title}</span>
                        </CardTitle>
                        <CardDescription>
                          {module.lessons} lessons • {module.duration}
                        </CardDescription>
                      </div>
                      {module.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <PlayCircle className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {module.lessons_list.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                            )}
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type}
                                </Badge>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/lessons/${lesson.id}`}>
                            <Button variant={lesson.completed ? "outline" : "default"} size="sm">
                              {lesson.completed ? "Review" : "Start"}
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Role-Specific Specializations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleSpecializations.map((role) => (
            <Card key={role.id} className={`${!role.unlocked ? "opacity-50" : ""}`}>
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{role.icon}</div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
                  <span>{role.lessons} lessons</span>
                  <span>{role.duration}</span>
                </div>
                <Button disabled={!role.unlocked} className="w-full">
                  {role.unlocked ? "Start Track" : "Unlock Required"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
