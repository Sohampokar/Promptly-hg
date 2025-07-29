"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Trophy,
  Download,
  Share,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Award,
  ExternalLink,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  const earnedCertificates = [
    {
      id: "foundation-cert",
      title: "Certified Prompt Explorer",
      description: "Foundation Track Completion",
      level: "Beginner",
      earnedDate: "2024-01-15",
      validUntil: "2026-01-15",
      credentialId: "PMF-2024-001234",
      skills: ["Basic Prompting", "AI Model Understanding", "Prompt Structure", "Best Practices"],
      issuer: "PromptMaster Academy",
      verificationUrl: "https://verify.promptmaster.com/PMF-2024-001234",
      color: "green",
    },
    {
      id: "intermediate-cert",
      title: "Certified Prompt Strategist",
      description: "Control & Creativity Track Completion",
      level: "Intermediate",
      earnedDate: "2024-01-22",
      validUntil: "2026-01-22",
      credentialId: "PMI-2024-001235",
      skills: ["Advanced Structures", "Role-based Prompting", "Multi-model Strategies", "Use-case Specialization"],
      issuer: "PromptMaster Academy",
      verificationUrl: "https://verify.promptmaster.com/PMI-2024-001235",
      color: "blue",
    },
  ]

  const availableCertificates = [
    {
      id: "advanced-cert",
      title: "Certified Prompt Architect",
      description: "Optimization & Automation Track",
      level: "Advanced",
      requirements: ["Complete Intermediate Certification", "Pass Advanced Assessment", "Complete Capstone Project"],
      estimatedTime: "4-6 weeks",
      skills: ["Prompt Chaining", "Workflow Automation", "Debugging", "Cost Optimization"],
      color: "purple",
      progress: 0,
      locked: true,
    },
    {
      id: "developer-cert",
      title: "Prompt Power User - Developer",
      description: "Developer-Specific Track",
      level: "Specialized",
      requirements: ["Complete Foundation Track", "Pass Developer Assessment", "Build 3 Projects"],
      estimatedTime: "3-4 weeks",
      skills: ["Code Generation", "API Integration", "Technical Documentation", "Debugging Prompts"],
      color: "indigo",
      progress: 25,
      locked: false,
    },
    {
      id: "marketer-cert",
      title: "Prompt Power User - Marketer",
      description: "Marketing-Specific Track",
      level: "Specialized",
      requirements: ["Complete Foundation Track", "Pass Marketing Assessment", "Create Campaign Portfolio"],
      estimatedTime: "3-4 weeks",
      skills: ["Content Creation", "Copywriting", "Campaign Optimization", "Brand Voice"],
      color: "pink",
      progress: 0,
      locked: false,
    },
    {
      id: "mastery-cert",
      title: "Prompt Mastery Champion",
      description: "Elite Certification",
      level: "Expert",
      requirements: [
        "Complete All Track Certifications",
        "Top 5% Leaderboard Ranking",
        "Mentor 10+ Students",
        "Contribute to Community",
      ],
      estimatedTime: "6+ months",
      skills: ["Expert-level Prompting", "Teaching", "Community Leadership", "Innovation"],
      color: "gold",
      progress: 15,
      locked: false,
    },
  ]

  const certificateStats = {
    totalEarned: earnedCertificates.length,
    totalAvailable: earnedCertificates.length + availableCertificates.length,
    skillsAcquired: earnedCertificates.reduce((acc, cert) => acc + cert.skills.length, 0),
    nextMilestone: "Advanced Certification",
  }

  const handleDownloadCertificate = (certificateId: string) => {
    // In a real app, this would generate and download a PDF certificate
    console.log(`Downloading certificate: ${certificateId}`)
  }

  const handleShareCertificate = (certificateId: string) => {
    // In a real app, this would open sharing options
    console.log(`Sharing certificate: ${certificateId}`)
  }

  const handleVerifyCertificate = (verificationUrl: string) => {
    window.open(verificationUrl, "_blank")
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
            <Link href="/certificates" className="text-purple-600 font-medium">
              Certificates
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Certifications</h1>
          <p className="text-gray-600">Track your learning achievements and showcase your expertise</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certificates Earned</p>
                  <p className="text-3xl font-bold text-green-600">{certificateStats.totalEarned}</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Available</p>
                  <p className="text-3xl font-bold text-blue-600">{certificateStats.totalAvailable}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Skills Acquired</p>
                  <p className="text-3xl font-bold text-purple-600">{certificateStats.skillsAcquired}</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Milestone</p>
                  <p className="text-lg font-bold text-orange-600">{certificateStats.nextMilestone}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="earned" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earned">Earned Certificates</TabsTrigger>
            <TabsTrigger value="available">Available Certificates</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-6">
            {earnedCertificates.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {earnedCertificates.map((certificate) => (
                  <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge
                          className={`
                            ${certificate.color === "green" ? "bg-green-100 text-green-700" : ""}
                            ${certificate.color === "blue" ? "bg-blue-100 text-blue-700" : ""}
                          `}
                        >
                          {certificate.level}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-green-600">Earned</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{certificate.title}</CardTitle>
                      <CardDescription>{certificate.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Certificate Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Earned Date</p>
                            <p className="font-medium">{new Date(certificate.earnedDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Valid Until</p>
                            <p className="font-medium">{new Date(certificate.validUntil).toLocaleDateString()}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-600">Credential ID</p>
                            <p className="font-mono text-sm">{certificate.credentialId}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <p className="text-sm font-medium mb-2">Skills Demonstrated</p>
                          <div className="flex flex-wrap gap-1">
                            {certificate.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleDownloadCertificate(certificate.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareCertificate(certificate.id)}
                            className="bg-transparent"
                          >
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyCertificate(certificate.verificationUrl)}
                            className="bg-transparent"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Verify
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-gray-600 mb-4">Complete courses to earn your first certificate</p>
                  <Link href="/courses">
                    <Button className="bg-purple-600 hover:bg-purple-700">Start Learning</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {availableCertificates.map((certificate) => (
                <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`
                          ${certificate.color === "purple" ? "bg-purple-100 text-purple-700" : ""}
                          ${certificate.color === "indigo" ? "bg-indigo-100 text-indigo-700" : ""}
                          ${certificate.color === "pink" ? "bg-pink-100 text-pink-700" : ""}
                          ${certificate.color === "gold" ? "bg-yellow-100 text-yellow-700" : ""}
                        `}
                      >
                        {certificate.level}
                      </Badge>
                      {certificate.locked && (
                        <Badge className="bg-gray-100 text-gray-600">
                          <Clock className="mr-1 h-3 w-3" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{certificate.title}</CardTitle>
                    <CardDescription>{certificate.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      {certificate.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{certificate.progress}%</span>
                          </div>
                          <Progress value={certificate.progress} className="h-2" />
                        </div>
                      )}

                      {/* Requirements */}
                      <div>
                        <p className="text-sm font-medium mb-2">Requirements</p>
                        <ul className="space-y-1">
                          {certificate.requirements.map((req, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-sm font-medium mb-2">Skills You'll Learn</p>
                        <div className="flex flex-wrap gap-1">
                          {certificate.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Estimated Time */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Estimated time: {certificate.estimatedTime}</span>
                      </div>

                      {/* Action */}
                      <div>
                        {certificate.locked ? (
                          <Button disabled className="w-full bg-gray-300">
                            Complete Prerequisites First
                          </Button>
                        ) : certificate.progress > 0 ? (
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Continue Progress</Button>
                        ) : (
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Certification</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Certificate Verification
                </CardTitle>
                <CardDescription>
                  Verify the authenticity of PromptMaster certificates using credential IDs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">How Verification Works</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Each certificate has a unique credential ID</li>
                    <li>• Certificates are blockchain-verified for authenticity</li>
                    <li>• Employers can verify credentials instantly</li>
                    <li>• All certificates include issuer verification</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Your Verifiable Certificates</h4>
                  {earnedCertificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{certificate.title}</p>
                        <p className="text-sm text-gray-600">ID: {certificate.credentialId}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyCertificate(certificate.verificationUrl)}
                        className="bg-transparent"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Verify Online
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 border rounded-lg p-4">
                  <h4 className="font-medium mb-2">For Employers</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Verify a candidate's PromptMaster certification by entering their credential ID below:
                  </p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter credential ID (e.g., PMF-2024-001234)"
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                    />
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Verify
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
