"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  MessageSquare,
  Users,
  Trophy,
  TrendingUp,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const discussions = [
    {
      id: 1,
      title: "Best practices for few-shot prompting with GPT-4?",
      content:
        "I've been experimenting with few-shot prompting and getting inconsistent results. What are your go-to strategies for creating effective examples?",
      author: {
        name: "Sarah Dev",
        username: "sarah_dev",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Advanced",
        xp: 8450,
      },
      category: "techniques",
      tags: ["gpt-4", "few-shot", "best-practices"],
      replies: 23,
      likes: 45,
      views: 234,
      timeAgo: "2 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "GPT-4 vs Claude 3 for creative writing - detailed comparison",
      content: "I've been testing both models for creative writing tasks. Here's what I found after 100+ prompts...",
      author: {
        name: "Mike Writer",
        username: "writer_mike",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Intermediate",
        xp: 3200,
      },
      category: "models",
      tags: ["gpt-4", "claude-3", "creative-writing", "comparison"],
      replies: 15,
      likes: 67,
      views: 456,
      timeAgo: "4 hours ago",
      isHot: false,
    },
    {
      id: 3,
      title: "Help debugging this chain-of-thought prompt",
      content:
        "My CoT prompt works sometimes but fails on complex problems. Can someone help me identify what's wrong?",
      author: {
        name: "AI Researcher",
        username: "ai_researcher",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Expert",
        xp: 12800,
      },
      category: "help",
      tags: ["chain-of-thought", "debugging", "help-needed"],
      replies: 8,
      likes: 23,
      views: 123,
      timeAgo: "6 hours ago",
      isHot: false,
    },
    {
      id: 4,
      title: "Prompt Battle Results: Marketing Copy Challenge",
      content: "The results are in! Here are the winning prompts from last week's marketing copy challenge...",
      author: {
        name: "Community Bot",
        username: "promptmaster_bot",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "System",
        xp: 0,
      },
      category: "challenges",
      tags: ["prompt-battle", "marketing", "results"],
      replies: 34,
      likes: 89,
      views: 567,
      timeAgo: "1 day ago",
      isHot: true,
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Prompt Ninja", username: "prompt_ninja", xp: 15420, badge: "🥇" },
    { rank: 2, name: "AI Whisperer", username: "ai_whisperer", xp: 12890, badge: "🥈" },
    { rank: 3, name: "Creative Coder", username: "creative_coder", xp: 11234, badge: "🥉" },
    { rank: 4, name: "Data Wizard", username: "data_wizard", xp: 9876, badge: "⭐" },
    { rank: 5, name: "Prompt Master", username: "prompt_master", xp: 8765, badge: "⭐" },
  ]

  const challenges = [
    {
      id: 1,
      title: "Prompt Battle: Technical Documentation",
      description: "Create the best prompt for generating clear, comprehensive technical documentation",
      participants: 156,
      prize: "750 XP + Badge",
      deadline: "3 days",
      difficulty: "Intermediate",
      status: "active",
    },
    {
      id: 2,
      title: "Debug the Broken Chain",
      description: "Fix a complex multi-step prompt that's producing inconsistent results",
      participants: 89,
      prize: "500 XP",
      deadline: "5 days",
      difficulty: "Advanced",
      status: "active",
    },
    {
      id: 3,
      title: "Creative Writing Showdown",
      description: "Write a prompt that generates engaging short stories with plot twists",
      participants: 234,
      prize: "1000 XP + Certificate",
      deadline: "1 week",
      difficulty: "Beginner",
      status: "active",
    },
  ]

  const categories = [
    { id: "all", name: "All Posts", count: discussions.length },
    { id: "techniques", name: "Techniques", count: 1 },
    { id: "models", name: "Model Comparisons", count: 1 },
    { id: "help", name: "Help & Support", count: 1 },
    { id: "challenges", name: "Challenges", count: 1 },
  ]

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            <Link href="/playground" className="text-gray-600 hover:text-purple-600 transition-colors">
              Playground
            </Link>
            <Link href="/community" className="text-purple-600 font-medium">
              Community
            </Link>
          </nav>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
          <p className="text-gray-600">Connect, learn, and share with fellow prompt engineers</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="discussions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="showcase">Showcase</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
                      >
                        {category.name} ({category.count})
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Discussion List */}
                <div className="space-y-4">
                  {filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex space-x-4">
                          <Avatar>
                            <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {discussion.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-lg font-semibold hover:text-purple-600 cursor-pointer">
                                    {discussion.title}
                                  </h3>
                                  {discussion.isHot && <Badge className="bg-red-100 text-red-700">🔥 Hot</Badge>}
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">{discussion.content}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">{discussion.author.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {discussion.author.level}
                                  </Badge>
                                </div>
                                <span>{discussion.timeAgo}</span>
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-4 w-4" />
                                  <span>{discussion.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{discussion.replies}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span>{discussion.views} views</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {discussion.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <div className="grid gap-6">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-xl font-semibold">{challenge.title}</h3>
                              <Badge
                                className={`
                                ${challenge.difficulty === "Beginner" ? "bg-green-100 text-green-700" : ""}
                                ${challenge.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" : ""}
                                ${challenge.difficulty === "Advanced" ? "bg-red-100 text-red-700" : ""}
                              `}
                              >
                                {challenge.difficulty}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{challenge.description}</p>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="flex items-center text-gray-500 mb-1">
                                  <Users className="h-4 w-4 mr-1" />
                                  Participants
                                </div>
                                <div className="font-semibold">{challenge.participants}</div>
                              </div>
                              <div>
                                <div className="flex items-center text-gray-500 mb-1">
                                  <Trophy className="h-4 w-4 mr-1" />
                                  Prize
                                </div>
                                <div className="font-semibold">{challenge.prize}</div>
                              </div>
                              <div>
                                <div className="flex items-center text-gray-500 mb-1">
                                  <Target className="h-4 w-4 mr-1" />
                                  Deadline
                                </div>
                                <div className="font-semibold">{challenge.deadline}</div>
                              </div>
                            </div>
                          </div>

                          <Button className="bg-purple-600 hover:bg-purple-700">Join Challenge</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="showcase" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Showcase Coming Soon</h3>
                    <p className="text-gray-600 mb-4">
                      Share your best prompts, templates, and AI-powered projects with the community
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">Be the First to Share</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Members</span>
                    <span className="font-semibold">12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Today</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts This Week</span>
                    <span className="font-semibold">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Challenges Active</span>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-bold">{user.badge}</span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-purple-600">{user.xp.toLocaleString()} XP</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask Question
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share className="mr-2 h-4 w-4" />
                  Share Prompt
                </Button>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "gpt-4",
                    "claude-3",
                    "few-shot",
                    "chain-of-thought",
                    "debugging",
                    "creative-writing",
                    "code-generation",
                    "marketing",
                  ].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-purple-100">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
