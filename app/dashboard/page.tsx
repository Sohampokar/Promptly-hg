"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Trophy, Users, Zap, Target, Calendar, TrendingUp, Star, Play, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalXP, setTotalXP] = useState(2450)
  const [level, setLevel] = useState(5)

  const learningPaths = [
    {
      id: "foundation",
      title: "Foundation Track",
      description: "Master the basics of AI communication",
      progress: 75,
      level: "Beginner",
      color: "green",
      modules: 4,
      completedModules: 3,
      estimatedTime: "2 weeks",
      nextLesson: "Understanding Context Windows",
    },
    {
      id: "intermediate",
      title: "Control & Creativity",
      description: "Advanced structures and techniques",
      progress: 30,
      level: "Intermediate",
      color: "yellow",
      modules: 6,
      completedModules: 2,
      estimatedTime: "3 weeks",
      nextLesson: "Role-Based Prompting",
    },
    {
      id: "advanced",
      title: "Optimization & Automation",
      description: "Master prompt chaining and workflows",
      progress: 0,
      level: "Advanced",
      color: "red",
      modules: 8,
      completedModules: 0,
      estimatedTime: "4 weeks",
      nextLesson: "Locked - Complete Intermediate first",
    },
  ]

  const recentAchievements = [
    { title: "First Prompt", description: "Created your first prompt", icon: "🎯", date: "2 days ago" },
    { title: "Week Warrior", description: "7-day learning streak", icon: "🔥", date: "Today" },
    { title: "Community Helper", description: "Helped 5 peers", icon: "🤝", date: "3 days ago" },
  ]

  const upcomingChallenges = [
    { title: "Prompt Battle: Marketing Copy", participants: 234, prize: "500 XP", deadline: "2 days" },
    { title: "Debug the Broken Chain", participants: 156, prize: "300 XP", deadline: "5 days" },
    { title: "Creative Writing Challenge", participants: 89, prize: "750 XP", deadline: "1 week" },
  ]

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
            <Link href="/dashboard" className="text-purple-600 font-medium">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-purple-600 transition-colors">
              Courses
            </Link>
            <Link href="/playground" className="text-gray-600 hover:text-purple-600 transition-colors">
              Playground
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-purple-600 transition-colors">
              Community
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Badge className="bg-purple-100 text-purple-700">Level {level}</Badge>
            <div className="text-sm text-gray-600">{totalXP.toLocaleString()} XP</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-gray-600">Ready to continue your prompt engineering journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Current Streak</p>
                  <p className="text-3xl font-bold">{currentStreak} days</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total XP</p>
                  <p className="text-3xl font-bold">{totalXP.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Completed</p>
                  <p className="text-3xl font-bold">23 lessons</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Rank</p>
                  <p className="text-3xl font-bold">#127</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="learning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="learning" className="space-y-6">
            <div className="grid gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={`
                            ${path.color === "green" ? "bg-green-100 text-green-700" : ""}
                            ${path.color === "yellow" ? "bg-yellow-100 text-yellow-700" : ""}
                            ${path.color === "red" ? "bg-red-100 text-red-700" : ""}
                          `}
                        >
                          {path.level}
                        </Badge>
                        <div>
                          <CardTitle className="text-xl">{path.title}</CardTitle>
                          <CardDescription>{path.description}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{path.progress}%</div>
                        <div className="text-sm text-gray-500">
                          {path.completedModules}/{path.modules} modules
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={path.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Next: {path.nextLesson}</span>
                        <span>Est. {path.estimatedTime}</span>
                      </div>
                      <div className="flex space-x-2">
                        {path.progress > 0 ? (
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <Play className="mr-2 h-4 w-4" />
                            Continue Learning
                          </Button>
                        ) : (
                          <Button disabled className="bg-gray-300">
                            <Lock className="mr-2 h-4 w-4" />
                            Locked
                          </Button>
                        )}
                        <Button variant="outline">View Curriculum</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAchievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6">
              {upcomingChallenges.map((challenge, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{challenge.title}</h3>
                        <p className="text-gray-600">{challenge.participants} participants</p>
                        <Badge className="mt-2 bg-green-100 text-green-700">Prize: {challenge.prize}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">Ends in {challenge.deadline}</div>
                        <Button className="bg-purple-600 hover:bg-purple-700">Join Challenge</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Recent Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-200 pl-4">
                      <h4 className="font-medium">Best practices for few-shot prompting?</h4>
                      <p className="text-sm text-gray-600">Started by @sarah_dev • 23 replies</p>
                    </div>
                    <div className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-medium">GPT-4 vs Claude for creative writing</h4>
                      <p className="text-sm text-gray-600">Started by @writer_mike • 15 replies</p>
                    </div>
                    <div className="border-l-4 border-green-200 pl-4">
                      <h4 className="font-medium">Debugging chain-of-thought prompts</h4>
                      <p className="text-sm text-gray-600">Started by @ai_researcher • 8 replies</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">
                          1
                        </div>
                        <span className="font-medium">@prompt_ninja</span>
                      </div>
                      <span className="text-sm text-gray-600">8,450 XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          2
                        </div>
                        <span className="font-medium">@ai_whisperer</span>
                      </div>
                      <span className="text-sm text-gray-600">7,890 XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                          3
                        </div>
                        <span className="font-medium">@creative_coder</span>
                      </div>
                      <span className="text-sm text-gray-600">6,234 XP</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                            127
                          </div>
                          <span className="font-medium">You</span>
                        </div>
                        <span className="text-sm text-gray-600">{totalXP.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/playground">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Try Playground</h3>
                  <p className="text-sm text-gray-600">Test prompts across different models</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/challenges">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Join Challenge</h3>
                  <p className="text-sm text-gray-600">Compete with other learners</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Ask Community</h3>
                  <p className="text-sm text-gray-600">Get help from experts</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
