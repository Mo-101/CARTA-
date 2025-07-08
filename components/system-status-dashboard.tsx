"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Database,
  Users,
  BookOpen,
  Heart,
  Coins,
  TrendingUp,
  Activity,
  Code,
} from "lucide-react"

interface ComponentStatus {
  name: string
  status: "live" | "pending" | "broken" | "partial"
  description: string
  features: string[]
  issues?: string[]
  completionPercentage: number
  lastUpdated: string
}

interface SystemMetrics {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  completedCourses: number
  flbDistributed: number
  healthFacilities: number
  validators: number
  uptime: number
}

export function SystemStatusDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [systemMetrics] = useState<SystemMetrics>({
    totalUsers: 12847,
    activeUsers: 8934,
    totalCourses: 847,
    completedCourses: 23456,
    flbDistributed: 2400000,
    healthFacilities: 6656,
    validators: 156,
    uptime: 99.7,
  })

  const componentStatuses: ComponentStatus[] = [
    {
      name: "Navigation System",
      status: "live",
      description: "Main navigation with FlameBorn branding and responsive design",
      features: ["Mobile responsive", "Active state highlighting", "Smooth animations", "Wallet integration"],
      completionPercentage: 100,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Youth Learning Hub",
      status: "live",
      description: "Complete learning platform with courses, progress tracking, and rewards",
      features: [
        "Course catalog",
        "Progress tracking",
        "FLB token rewards",
        "Achievement system",
        "Focus timer",
        "Peer reviews",
        "Daily challenges",
        "Leaderboard",
      ],
      completionPercentage: 95,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Validator Portal",
      status: "live",
      description: "Submission review system with batch operations and analytics",
      features: [
        "Submission queue",
        "Batch review operations",
        "Evidence verification",
        "Analytics dashboard",
        "Reputation system",
        "Review history",
      ],
      completionPercentage: 90,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Health Impact Tracking",
      status: "live",
      description: "Health facility network with donation tracking and impact metrics",
      features: [
        "Facility verification",
        "Donation transparency",
        "Impact visualization",
        "Regional distribution",
        "Real-time metrics",
      ],
      completionPercentage: 85,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Review System",
      status: "live",
      description: "Comprehensive 5-star review system with replies and moderation",
      features: [
        "5-star ratings",
        "Detailed reviews",
        "Reply system",
        "Helpful voting",
        "Review moderation",
        "Verified badges",
      ],
      completionPercentage: 100,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Wallet Integration",
      status: "live",
      description: "MetaMask wallet connection with BSC network support",
      features: ["MetaMask connection", "BSC network", "Balance display", "Transaction history"],
      completionPercentage: 80,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Trading Dashboard",
      status: "live",
      description: "Real-time market data with AI-powered strategy suggestions",
      features: [
        "Binance API integration",
        "Real-time price data",
        "Technical indicators",
        "AI strategy advisor",
        "Market analysis",
      ],
      issues: ["OpenAI API key missing - using mock responses"],
      completionPercentage: 75,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Community Features",
      status: "live",
      description: "Social features including posts, discussions, and networking",
      features: ["Community posts", "User profiles", "Social interactions", "Networking graph"],
      completionPercentage: 70,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Smart Contracts",
      status: "pending",
      description: "Blockchain contracts for FLB tokens and reward distribution",
      features: ["FLB token contract", "Reward distribution", "Staking mechanism", "Governance"],
      issues: ["Not deployed to mainnet", "Testing on local network only"],
      completionPercentage: 60,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Course Content Player",
      status: "pending",
      description: "Interactive video and content player for educational materials",
      features: ["Video playback", "Interactive quizzes", "Progress tracking", "Offline support"],
      issues: ["Not implemented", "Requires video hosting solution"],
      completionPercentage: 0,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Health Metrics API",
      status: "pending",
      description: "Real-time health facility data and impact tracking API",
      features: ["Real-time data", "Facility verification", "Impact calculations", "Regional analytics"],
      issues: ["Mock data only", "No real health facility connections"],
      completionPercentage: 30,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Mobile App",
      status: "pending",
      description: "React Native mobile application for offline learning",
      features: ["Offline learning", "Push notifications", "Mobile wallet", "Sync capabilities"],
      issues: ["Not started", "Requires React Native setup"],
      completionPercentage: 0,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Multi-language Support",
      status: "pending",
      description: "Internationalization for African languages",
      features: ["Swahili support", "French support", "Arabic support", "Language switching"],
      issues: ["No i18n implementation", "Translation files missing"],
      completionPercentage: 0,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Anti-Distraction System",
      status: "pending",
      description: "Focus enhancement tools and distraction blocking",
      features: ["Website blocking", "Focus sessions", "Productivity tracking", "Reward bonuses"],
      issues: ["Not implemented", "Requires browser extension"],
      completionPercentage: 0,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Corporate Sponsorship",
      status: "pending",
      description: "Corporate partnership and sponsorship management system",
      features: ["Sponsor dashboard", "Campaign management", "ROI tracking", "Partnership tools"],
      issues: ["Not implemented", "Business model needs refinement"],
      completionPercentage: 0,
      lastUpdated: "2024-01-08",
    },
    {
      name: "Geolocation Features",
      status: "pending",
      description: "Location-based services and regional customization",
      features: ["Location detection", "Regional content", "Local health facilities", "Geographic analytics"],
      issues: ["Not implemented", "Privacy considerations needed"],
      completionPercentage: 0,
      lastUpdated: "2024-01-08",
    },
  ]

  const getStatusIcon = (status: ComponentStatus["status"]) => {
    switch (status) {
      case "live":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "broken":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusColor = (status: ComponentStatus["status"]) => {
    switch (status) {
      case "live":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "partial":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "broken":
        return "bg-red-500/20 text-red-400 border-red-500/30"
    }
  }

  const liveComponents = componentStatuses.filter((c) => c.status === "live")
  const pendingComponents = componentStatuses.filter((c) => c.status === "pending")
  const partialComponents = componentStatuses.filter((c) => c.status === "partial")
  const brokenComponents = componentStatuses.filter((c) => c.status === "broken")

  const overallCompletion =
    componentStatuses.reduce((acc, comp) => acc + comp.completionPercentage, 0) / componentStatuses.length

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Live Components</p>
                <p className="text-2xl font-bold text-white">{liveComponents.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">{pendingComponents.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Overall Progress</p>
                <p className="text-2xl font-bold text-white">{overallCompletion.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">System Uptime</p>
                <p className="text-2xl font-bold text-white">{systemMetrics.uptime}%</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Metrics */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="mr-2 h-5 w-5 text-orange-500" />
            Platform Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricItem
              icon={<Users className="h-5 w-5 text-blue-500" />}
              label="Total Users"
              value={systemMetrics.totalUsers.toLocaleString()}
              subValue={`${systemMetrics.activeUsers.toLocaleString()} active`}
            />
            <MetricItem
              icon={<BookOpen className="h-5 w-5 text-green-500" />}
              label="Courses"
              value={systemMetrics.totalCourses.toLocaleString()}
              subValue={`${systemMetrics.completedCourses.toLocaleString()} completed`}
            />
            <MetricItem
              icon={<Coins className="h-5 w-5 text-orange-500" />}
              label="FLB Distributed"
              value={`${(systemMetrics.flbDistributed / 1000000).toFixed(1)}M`}
              subValue="Total rewards"
            />
            <MetricItem
              icon={<Heart className="h-5 w-5 text-red-500" />}
              label="Health Facilities"
              value={systemMetrics.healthFacilities.toLocaleString()}
              subValue={`${systemMetrics.validators} validators`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Component Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
            Live ({liveComponents.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            Pending ({pendingComponents.length})
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-red-500 data-[state=active]:text-black">
            Issues
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {componentStatuses.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ComponentCard component={component} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ComponentCard component={component} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ComponentCard component={component} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card className="bg-black/80 border-red-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Known Issues & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {componentStatuses
                  .filter((c) => c.issues && c.issues.length > 0)
                  .map((component) => (
                    <div key={component.name} className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h4 className="text-white font-medium mb-2">{component.name}</h4>
                      <ul className="space-y-1">
                        {component.issues?.map((issue, index) => (
                          <li key={index} className="text-red-400 text-sm flex items-start">
                            <XCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Development Roadmap */}
      <Card className="bg-black/80 border-purple-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Code className="mr-2 h-5 w-5 text-purple-500" />
            Development Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RoadmapItem
              title="Phase 1: Core Platform (COMPLETED)"
              status="completed"
              items={[
                "Navigation & UI Framework",
                "Youth Learning Hub",
                "Validator Portal",
                "Review System",
                "Wallet Integration",
              ]}
            />
            <RoadmapItem
              title="Phase 2: Blockchain Integration (IN PROGRESS)"
              status="in-progress"
              items={["Smart Contract Development", "Token Distribution", "On-chain Verification", "BSC Integration"]}
            />
            <RoadmapItem
              title="Phase 3: Content & Features (PENDING)"
              status="pending"
              items={["Course Content Player", "Health Metrics API", "Mobile Application", "Multi-language Support"]}
            />
            <RoadmapItem
              title="Phase 4: Advanced Features (PLANNED)"
              status="planned"
              items={[
                "Anti-Distraction System",
                "Corporate Sponsorship",
                "Geolocation Features",
                "AI-Powered Recommendations",
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ComponentCard({ component }: { component: ComponentStatus }) {
  const getStatusIcon = (status: ComponentStatus["status"]) => {
    switch (status) {
      case "live":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "broken":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusColor = (status: ComponentStatus["status"]) => {
    switch (status) {
      case "live":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "partial":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "broken":
        return "bg-red-500/20 text-red-400 border-red-500/30"
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(component.status)}
            <CardTitle className="text-white text-lg">{component.name}</CardTitle>
          </div>
          <Badge className={getStatusColor(component.status)}>{component.status.toUpperCase()}</Badge>
        </div>
        <CardDescription className="text-gray-400">{component.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Completion</span>
              <span className="text-white">{component.completionPercentage}%</span>
            </div>
            <Progress value={component.completionPercentage} className="h-2" />
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-medium text-sm mb-2">Features</h4>
            <div className="flex flex-wrap gap-1">
              {component.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Issues */}
          {component.issues && component.issues.length > 0 && (
            <div>
              <h4 className="text-red-400 font-medium text-sm mb-2">Issues</h4>
              <ul className="space-y-1">
                {component.issues.map((issue, index) => (
                  <li key={index} className="text-red-400 text-xs flex items-start">
                    <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-xs text-gray-500">Last updated: {component.lastUpdated}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function MetricItem({ icon, label, value, subValue }: any) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
      {icon}
      <div>
        <p className="text-white font-bold">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-gray-500 text-xs">{subValue}</p>
      </div>
    </div>
  )
}

function RoadmapItem({ title, status, items }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "planned":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-medium">{title}</h4>
        <Badge className={getStatusColor(status)}>{status.replace("-", " ").toUpperCase()}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map((item: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            {status === "completed" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : status === "in-progress" ? (
              <Clock className="h-4 w-4 text-blue-500" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-gray-600" />
            )}
            <span className="text-gray-300 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
