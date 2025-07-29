import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Users, Trophy, Zap, BookOpen, Target, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
            <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#courses" className="text-gray-600 hover:text-purple-600 transition-colors">
              Courses
            </Link>
            <Link href="#community" className="text-gray-600 hover:text-purple-600 transition-colors">
              Community
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
            🚀 The Future of AI Communication
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Master the Art of
            <br />
            Prompt Engineering
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn to communicate with AI like a pro. From beginner basics to advanced techniques, become the bridge
            between human creativity and artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-purple-200 hover:bg-purple-50 bg-transparent"
              >
                Try Playground
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">10K+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Interactive Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose PromptMaster?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most comprehensive platform for learning prompt engineering with hands-on practice and real-world
              applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Structured Learning Paths</CardTitle>
                <CardDescription>
                  From beginner to advanced, follow curated paths designed by AI experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Interactive Playground</CardTitle>
                <CardDescription>Test prompts across GPT-4, Claude, and Gemini with real-time feedback</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Community Challenges</CardTitle>
                <CardDescription>Join prompt battles, share techniques, and learn from peers</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Gamified Progress</CardTitle>
                <CardDescription>Earn XP, unlock achievements, and track your improvement journey</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Role-Based Training</CardTitle>
                <CardDescription>Specialized tracks for developers, marketers, researchers, and more</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>AI-Powered Feedback</CardTitle>
                <CardDescription>Get instant, personalized feedback on your prompts from our AI tutor</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section id="courses" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored curricula for different roles and skill levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-green-200 hover:border-green-300 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-green-100 text-green-700">Beginner</Badge>
                <CardTitle className="text-green-700">Foundation Track</CardTitle>
                <CardDescription>Master the basics of AI communication and prompt structure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Understanding AI Models</li>
                  <li>• Basic Prompt Anatomy</li>
                  <li>• Common Use Cases</li>
                  <li>• Practice Arena Level 1</li>
                </ul>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Start Learning</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-yellow-200 hover:border-yellow-300 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-yellow-100 text-yellow-700">Intermediate</Badge>
                <CardTitle className="text-yellow-700">Control & Creativity</CardTitle>
                <CardDescription>Advanced structures and role-based prompting techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Advanced Prompt Structures</li>
                  <li>• Multi-Model Strategies</li>
                  <li>• Use-Case Specialization</li>
                  <li>• Practice Arena Level 2</li>
                </ul>
                <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700">Continue Journey</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-red-200 hover:border-red-300 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-red-100 text-red-700">Advanced</Badge>
                <CardTitle className="text-red-700">Optimization & Automation</CardTitle>
                <CardDescription>Master prompt chaining, debugging, and workflow automation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Expert Prompt Patterns</li>
                  <li>• Multi-step Workflows</li>
                  <li>• Debugging & Optimization</li>
                  <li>• Capstone Projects</li>
                </ul>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Master Level</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Become a Prompt Master?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their AI interactions
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">PromptMaster</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for mastering AI communication and prompt engineering.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Learning</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/playground" className="hover:text-white transition-colors">
                    Playground
                  </Link>
                </li>
                <li>
                  <Link href="/challenges" className="hover:text-white transition-colors">
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link href="/certification" className="hover:text-white transition-colors">
                    Certification
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Forums
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-white transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PromptMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
