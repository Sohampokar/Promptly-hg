"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowLeft,
  Download,
  Share,
  Trophy,
  Target,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string

  // Mock course data - in real app, this would be fetched based on courseId
  const course = {
    id: "foundation",
    title: "Foundation Track",
    description:
      "Master the basics of AI communication and prompt structure. This comprehensive course will take you from complete beginner to confident prompt engineer.",
    level: "Beginner",
    duration: "2 weeks",
    modules: 4,
    completedModules: 3,
    progress: 75,
    enrolled: 12500,
    rating: 4.9,
    reviews: 2340,
    color: "green",
    instructor: {
      name: "Dr. Sarah Chen",
      title: "AI Research Scientist",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    whatYouWillLearn: [
      "Understand how AI language models work",
      "Write effective prompts for different use cases",
      "Master the anatomy of a well-structured prompt",
      "Avoid common prompting mistakes",
      "Practice with real-world scenarios",
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Prompting",
        description: "Learn the fundamentals of AI communication",
        duration: "45 min",
        lessons: 3,
        completed: true,
        lessons_detail: [
          { title: "What is Prompt Engineering?", duration: "15 min", completed: true },
          { title: "History & Evolution of LLMs", duration: "12 min", completed: true },
          { title: "Prompt vs Programming", duration: "18 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Understanding AI Models",
        description: "Deep dive into how AI models process information",
        duration: "60 min",
        lessons: 4,
        completed: true,
        lessons_detail: [
          { title: "ChatGPT vs Claude vs Gemini", duration: "20 min", completed: true },
          { title: "Tokens and Context Windows", duration: "15 min", completed: true },
          { title: "Temperature and Randomness", duration: "12 min", completed: true },
          { title: "Model Limitations", duration: "13 min", completed: true },
        ],
      },
      {
        id: 3,
        title: "Prompt Anatomy",
        description: "Learn the structure of effective prompts",
        duration: "50 min",
        lessons: 3,
        completed: true,
        lessons_detail: [
          { title: "Basic Prompt Structure", duration: "18 min", completed: true },
          { title: "Instructions vs Context", duration: "16 min", completed: true },
          { title: "Examples and Few-shot Learning", duration: "16 min", completed: true },
        ],
      },
      {
        id: 4,
        title: "Practice Arena - Level 1",
        description: "Apply your knowledge with hands-on exercises",
        duration: "90 min",
        lessons: 5,
        completed: false,
        lessons_detail: [
          { title: "Writing Your First Prompt", duration: "20 min", completed: false },
          { title: "Fixing Broken Prompts", duration: "25 min", completed: false },
          { title: "Reverse Engineering Challenge", duration: "15 min", completed: false },
          { title: "Use Case Practice", duration: "20 min", completed: false },
          { title: "Module Assessment", duration: "10 min", completed: false },
        ],
      },
    ],
  }

  const [activeModule, setActiveModule] = useState(4) // Next incomplete module

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/courses">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PromptMaster
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-green-100 text-green-700">{course.level}</Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                    <span>({course.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Your Progress</span>
                    <span>{course.progress}% Complete</span>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                  <p className="text-sm text-gray-500 mt-2">
                    {course.completedModules} of {course.modules} modules completed
                  </p>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{course.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{course.modules}</div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{course.enrolled.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-4">
                {course.modules.map((module) => (
                  <Card key={module.id} className={`${activeModule === module.id ? "ring-2 ring-purple-500" : ""}`}>
                    <CardHeader
                      className="cursor-pointer"
                      onClick={() => setActiveModule(activeModule === module.id ? 0 : module.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {module.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium">{module.id}</span>
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{module.duration}</div>
                          <div className="text-xs text-gray-400">{module.lessons} lessons</div>
                        </div>
                      </div>
                    </CardHeader>

                    {activeModule === module.id && (
                      <CardContent>
                        <Separator className="mb-4" />
                        <div className="space-y-3">
                          {module.lessons_detail.map((lesson, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex items-center space-x-3">
                                {lesson.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Play className="h-4 w-4 text-gray-400" />
                                )}
                                <span className={lesson.completed ? "text-gray-600" : "text-gray-900"}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          {module.completed ? (
                            <Button variant="outline" className="w-full bg-transparent">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Module Completed
                            </Button>
                          ) : (
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              <Play className="mr-2 h-4 w-4" />
                              {module.id === 4 ? "Continue Learning" : "Start Module"}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5" />
                      What You'll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5" />
                      Prerequisites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      No prior experience required! This course is designed for complete beginners who want to learn how
                      to communicate effectively with AI systems.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5" />
                      Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Upon successful completion of this course, you'll receive a verified certificate that you can
                      share on LinkedIn and add to your resume.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor.avatar || "/placeholder.svg"}
                        alt={course.instructor.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{course.instructor.title}</p>
                        <p className="text-gray-700">
                          Dr. Sarah Chen is a leading AI researcher with over 10 years of experience in natural language
                          processing and machine learning. She has published numerous papers on AI communication and has
                          trained thousands of professionals in prompt engineering techniques.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Free</div>
                  <p className="text-gray-600">Full access to all content</p>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration} to complete
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {course.enrolled.toLocaleString()} enrolled
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2" />
                    Certificate included
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{course.completedModules}</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{course.modules - course.completedModules}</div>
                      <div className="text-xs text-gray-600">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Next Recommended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium mb-1">Control & Creativity</h4>
                    <p className="text-sm text-gray-600 mb-2">Advanced prompting techniques</p>
                    <Badge className="bg-yellow-100 text-yellow-700">Intermediate</Badge>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium mb-1">Prompting for Developers</h4>
                    <p className="text-sm text-gray-600 mb-2">Code generation and debugging</p>
                    <Badge className="bg-blue-100 text-blue-700">Specialized</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
