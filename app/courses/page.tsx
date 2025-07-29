"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Brain, BookOpen, Play, Lock, Clock, Users, Star, Search, Trophy, Target, Zap } from "lucide-react"
import Link from "next/link"
import { useCourses } from "@/lib/hooks/useApi"
import { useEffect } from "react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [courses, setCourses] = useState([])
  const { getCourses, loading } = useCourses()

  useEffect(() => {
    loadCourses()
  }, [selectedCategory, searchQuery])

  const loadCourses = async () => {
    try {
      const filters: any = {}
      
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory
      }
      
      if (searchQuery) {
        filters.search = searchQuery
      }

      const result = await getCourses(filters)
      if (result.success) {
        setCourses(result.data)
      }
    } catch (error) {
      console.error('Failed to load courses:', error)
    }
  }

  const defaultCourses = [
    {
      id: "foundation",
      title: "Foundation Track",
      description: "Master the basics of AI communication and prompt structure",
      level: "Beginner",
      duration: "2 weeks",
      modules: 4,
      completedModules: 3,
      progress: 75,
      enrolled: 12500,
      rating: 4.9,
      color: "green",
      category: "fundamentals",
      lessons: [
        { title: "Introduction to Prompting", completed: true, duration: "15 min" },
        { title: "Understanding AI Models", completed: true, duration: "20 min" },
        { title: "Prompt Anatomy", completed: true, duration: "18 min" },
        { title: "Practice Arena - Level 1", completed: false, duration: "30 min" },
      ],
    },
    {
      id: "intermediate",
      title: "Control & Creativity",
      description: "Advanced structures and role-based prompting techniques",
      level: "Intermediate",
      duration: "3 weeks",
      modules: 6,
      completedModules: 2,
      progress: 30,
      enrolled: 8900,
      rating: 4.8,
      color: "yellow",
      category: "advanced-techniques",
      lessons: [
        { title: "Advanced Prompt Structures", completed: true, duration: "25 min" },
        { title: "Role Assignments", completed: true, duration: "22 min" },
        { title: "Multi-Step Instructions", completed: false, duration: "28 min" },
        { title: "Few-shot Prompting", completed: false, duration: "30 min" },
        { title: "Model-Specific Techniques", completed: false, duration: "35 min" },
        { title: "Practice Arena - Level 2", completed: false, duration: "45 min" },
      ],
    },
    {
      id: "advanced",
      title: "Optimization & Automation",
      description: "Master prompt chaining, debugging, and workflow automation",
      level: "Advanced",
      duration: "4 weeks",
      modules: 8,
      completedModules: 0,
      progress: 0,
      enrolled: 3200,
      rating: 4.9,
      color: "red",
      category: "automation",
      lessons: [
        { title: "Expert Prompt Patterns", completed: false, duration: "30 min" },
        { title: "Chain-of-Thought Reasoning", completed: false, duration: "35 min" },
        { title: "Multi-step Workflows", completed: false, duration: "40 min" },
        { title: "Prompt Debugging", completed: false, duration: "25 min" },
        { title: "Cost Optimization", completed: false, duration: "20 min" },
        { title: "Automation Tools", completed: false, duration: "45 min" },
        { title: "Real-world Projects", completed: false, duration: "60 min" },
        { title: "Capstone Challenge", completed: false, duration: "90 min" },
      ],
    },
    {
      id: "developer",
      title: "Prompting for Developers",
      description: "Code generation, debugging, and technical documentation",
      level: "Specialized",
      duration: "3 weeks",
      modules: 5,
      completedModules: 0,
      progress: 0,
      enrolled: 5600,
      rating: 4.7,
      color: "blue",
      category: "role-specific",
      lessons: [
        { title: "Code Generation Prompts", completed: false, duration: "30 min" },
        { title: "Debugging with AI", completed: false, duration: "25 min" },
        { title: "Documentation Writing", completed: false, duration: "20 min" },
        { title: "API Integration", completed: false, duration: "35 min" },
        { title: "Developer Tools", completed: false, duration: "40 min" },
      ],
    },
    {
      id: "marketer",
      title: "Prompting for Marketers",
      description: "Content creation, copywriting, and campaign optimization",
      level: "Specialized",
      duration: "2.5 weeks",
      modules: 5,
      completedModules: 0,
      progress: 0,
      enrolled: 7800,
      rating: 4.8,
      color: "purple",
      category: "role-specific",
      lessons: [
        { title: "Marketing Copy Generation", completed: false, duration: "25 min" },
        { title: "Social Media Content", completed: false, duration: "20 min" },
        { title: "Email Campaigns", completed: false, duration: "30 min" },
        { title: "SEO Content", completed: false, duration: "28 min" },
        { title: "Campaign Analysis", completed: false, duration: "35 min" },
      ],
    },
    {
      id: "researcher",
      title: "Prompting for Researchers",
      description: "Academic writing, data analysis, and literature reviews",
      level: "Specialized",
      duration: "3 weeks",
      modules: 6,
      completedModules: 0,
      progress: 0,
      enrolled: 4200,
      rating: 4.9,
      color: "indigo",
      category: "role-specific",
      lessons: [
        { title: "Research Question Formulation", completed: false, duration: "30 min" },
        { title: "Literature Review Assistance", completed: false, duration: "35 min" },
        { title: "Data Analysis Prompts", completed: false, duration: "40 min" },
        { title: "Academic Writing", completed: false, duration: "25 min" },
        { title: "Citation and References", completed: false, duration: "20 min" },
        { title: "Research Methodology", completed: false, duration: "45 min" },
      ],
    },
  ]

  const categories = [
    { id: "all", name: "All Courses", count: courses.length || defaultCourses.length },
    { id: "fundamentals", name: "Fundamentals", count: (courses.length > 0 ? courses : defaultCourses).filter((c: any) => c.category === "fundamentals").length },
    {
      id: "advanced-techniques",
      name: "Advanced Techniques",
      count: (courses.length > 0 ? courses : defaultCourses).filter((c: any) => c.category === "advanced-techniques").length,
    },
    { id: "automation", name: "Automation", count: (courses.length > 0 ? courses : defaultCourses).filter((c: any) => c.category === "automation").length },
    { id: "role-specific", name: "Role-Specific", count: (courses.length > 0 ? courses : defaultCourses).filter((c: any) => c.category === "role-specific").length },
  ]

  const displayCourses = courses.length > 0 ? courses : defaultCourses
  const filteredCourses = displayCourses.filter((course: any) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
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
            <Link href="/courses" className="text-purple-600 font-medium">
              Courses
            </Link>
            <Link href="/playground" className="text-gray-600 hover:text-purple-600 transition-colors">
              Playground
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-purple-600 transition-colors">
              Community
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
          <p className="text-gray-600">Master prompt engineering with structured, hands-on courses</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
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
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    className={`
                      ${course.color === "green" ? "bg-green-100 text-green-700" : ""}
                      ${course.color === "yellow" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${course.color === "red" ? "bg-red-100 text-red-700" : ""}
                      ${course.color === "blue" ? "bg-blue-100 text-blue-700" : ""}
                      ${course.color === "purple" ? "bg-purple-100 text-purple-700" : ""}
                      ${course.color === "indigo" ? "bg-indigo-100 text-indigo-700" : ""}
                    `}
                  >
                    {course.level}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  {course.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.modules} modules
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrolled.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {course.progress > 0 ? (
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Play className="mr-2 h-4 w-4" />
                          Continue
                        </Button>
                      </Link>
                    ) : course.level === "Advanced" && course.progress === 0 ? (
                      <Button disabled className="flex-1 bg-gray-300">
                        <Lock className="mr-2 h-4 w-4" />
                        Locked
                      </Button>
                    ) : (
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Play className="mr-2 h-4 w-4" />
                          Start Course
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline">Preview</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Path Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Learning Path</h2>
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Complete Prompt Engineering Mastery</h3>
                  <p className="text-purple-100 mb-4">Follow our structured path from beginner to expert level</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      Certificate included
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Job-ready skills
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Hands-on projects
                    </div>
                  </div>
                </div>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">Start Journey</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fundamentals</h3>
                <p className="text-sm text-gray-600">Start your journey with the basics</p>
                <Badge className="mt-2 bg-green-100 text-green-700">
                  {categories.find((c) => c.id === "fundamentals")?.count} courses
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Advanced Techniques</h3>
                <p className="text-sm text-gray-600">Master complex prompting strategies</p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-700">
                  {categories.find((c) => c.id === "advanced-techniques")?.count} courses
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Automation</h3>
                <p className="text-sm text-gray-600">Build automated AI workflows</p>
                <Badge className="mt-2 bg-red-100 text-red-700">
                  {categories.find((c) => c.id === "automation")?.count} courses
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Role-Specific</h3>
                <p className="text-sm text-gray-600">Tailored for your profession</p>
                <Badge className="mt-2 bg-blue-100 text-blue-700">
                  {categories.find((c) => c.id === "role-specific")?.count} courses
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
