"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Users,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Download,
  BarChart3,
  Settings,
  Bell,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")

  const stats = {
    totalUsers: 12450,
    activeUsers: 3240,
    coursesCompleted: 8960,
    totalRevenue: 45600,
    newSignups: 234,
    courseCompletionRate: 78,
    avgSessionTime: "24m",
    supportTickets: 12,
  }

  const userGrowth = [
    { date: "2024-01-01", users: 8500 },
    { date: "2024-01-08", users: 9200 },
    { date: "2024-01-15", users: 10100 },
    { date: "2024-01-22", users: 11300 },
    { date: "2024-01-29", users: 12450 },
  ]

  const courseAnalytics = [
    {
      id: "foundation",
      title: "Foundation Track",
      enrolled: 8500,
      completed: 6800,
      completionRate: 80,
      avgRating: 4.9,
      dropOffPoints: ["Module 2: Understanding AI Models", "Practice Arena - Level 1"],
    },
    {
      id: "intermediate",
      title: "Control & Creativity",
      enrolled: 4200,
      completed: 2940,
      completionRate: 70,
      avgRating: 4.8,
      dropOffPoints: ["Advanced Prompt Structures", "Multi-Model Strategies"],
    },
    {
      id: "advanced",
      title: "Optimization & Automation",
      enrolled: 1800,
      completed: 1260,
      completionRate: 70,
      avgRating: 4.9,
      dropOffPoints: ["Prompt Chaining", "Debugging Techniques"],
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      joinDate: "2024-01-29",
      status: "active",
      progress: 45,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@example.com",
      joinDate: "2024-01-28",
      status: "active",
      progress: 78,
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      email: "mike@example.com",
      joinDate: "2024-01-27",
      status: "inactive",
      progress: 23,
      lastActive: "3 days ago",
    },
  ]

  const supportTickets = [
    {
      id: 1,
      user: "john@example.com",
      subject: "Cannot access playground",
      priority: "high",
      status: "open",
      created: "2 hours ago",
    },
    {
      id: 2,
      user: "emma@example.com",
      subject: "Course progress not saving",
      priority: "medium",
      status: "in-progress",
      created: "4 hours ago",
    },
    {
      id: 3,
      user: "david@example.com",
      subject: "Certificate download issue",
      priority: "low",
      status: "resolved",
      created: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PromptMaster Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Link href="/dashboard">
              <Button size="sm">Back to Platform</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{stats.newSignups} this week</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Courses Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.coursesCompleted.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{stats.courseCompletionRate}% completion rate</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Support Tickets</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.supportTickets}</p>
                  <p className="text-sm text-orange-600">3 urgent</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Total registered users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {userGrowth.map((point, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-purple-600 rounded-t"
                          style={{
                            height: `${(point.users / Math.max(...userGrowth.map((p) => p.users))) * 200}px`,
                            width: "40px",
                          }}
                        />
                        <span className="text-xs mt-2">{point.date.slice(5)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Completion rates by course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseAnalytics.map((course) => (
                      <div key={course.id}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{course.title}</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{course.enrolled} enrolled</span>
                          <span>{course.completed} completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Drop-off Analysis</CardTitle>
                <CardDescription>Where students are leaving courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courseAnalytics.map((course) => (
                    <div key={course.id}>
                      <h4 className="font-medium mb-3">{course.title}</h4>
                      <div className="space-y-2">
                        {course.dropOffPoints.map((point, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <span className="text-sm">{point}</span>
                            <Badge className="bg-red-100 text-red-700">High Drop-off</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Users
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-purple-600">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.progress}% Progress</p>
                          <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                        </div>
                        <Badge className={user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100"}>
                          {user.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </div>

            <div className="grid gap-6">
              {courseAnalytics.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>
                          {course.enrolled} enrolled • {course.avgRating}⭐ rating
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Completion Rate</p>
                        <p className="text-2xl font-bold text-green-600">{course.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Students Completed</p>
                        <p className="text-2xl font-bold text-blue-600">{course.completed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Average Rating</p>
                        <p className="text-2xl font-bold text-purple-600">{course.avgRating}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Content
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Lesson</CardTitle>
                <CardDescription>Add interactive content to your courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lesson-title">Lesson Title</Label>
                    <Input id="lesson-title" placeholder="Enter lesson title" />
                  </div>
                  <div>
                    <Label htmlFor="course-select">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="foundation">Foundation Track</SelectItem>
                        <SelectItem value="intermediate">Control & Creativity</SelectItem>
                        <SelectItem value="advanced">Optimization & Automation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="lesson-content">Lesson Content</Label>
                  <Textarea id="lesson-content" placeholder="Enter lesson content..." rows={6} />
                </div>
                <div className="flex space-x-2">
                  <Button>Save Draft</Button>
                  <Button variant="outline">Preview</Button>
                  <Button variant="outline">Publish</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Support Tickets</h2>
              <Badge className="bg-orange-100 text-orange-700">{stats.supportTickets} Open</Badge>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            ticket.priority === "high"
                              ? "bg-red-500"
                              : ticket.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-gray-500">{ticket.user}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            ticket.status === "open"
                              ? "bg-red-100 text-red-700"
                              : ticket.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {ticket.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{ticket.created}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Settings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Password Requirements</span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Timeout</span>
                    <span className="text-sm text-gray-600">24 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Maintenance Mode</span>
                    <Badge className="bg-gray-100">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Registration</span>
                    <Badge className="bg-green-100 text-green-700">Open</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Rate Limiting</span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
