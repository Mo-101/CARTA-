"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Flame,
  Heart,
  Shield,
  Users,
  BookOpen,
  TrendingUp,
  Coins,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Zap,
  Globe,
  Target,
  Star,
  Play,
  Eye,
  ThumbsUp,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function PreviewPage() {
  const [activeDemo, setActiveDemo] = useState("overview")

  return (
    <main className="relative w-full min-h-screen bg-black">
      <Navigation />

      <div className="pt-20 pb-8 px-4 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-orange-500">Flame</span>Born Preview
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the complete Learn & Earn ecosystem - from youth education to validator governance
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              🔥 Sovereign African Health Currency
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✅ Zero Pay-to-Play Model</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">🎓 Learn & Earn Ecosystem</Badge>
          </div>
        </motion.div>

        {/* Demo Navigation */}
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-900/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              System Overview
            </TabsTrigger>
            <TabsTrigger value="youth" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Youth Dashboard
            </TabsTrigger>
            <TabsTrigger value="validator" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Validator Portal
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Health Impact
            </TabsTrigger>
          </TabsList>

          {/* System Overview */}
          <TabsContent value="overview" className="space-y-6">
            <SystemOverview />
          </TabsContent>

          {/* Youth Dashboard Preview */}
          <TabsContent value="youth" className="space-y-6">
            <YouthDashboardPreview />
          </TabsContent>

          {/* Validator Portal Preview */}
          <TabsContent value="validator" className="space-y-6">
            <ValidatorPortalPreview />
          </TabsContent>

          {/* Health Impact Preview */}
          <TabsContent value="health" className="space-y-6">
            <HealthImpactPreview />
          </TabsContent>
        </Tabs>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <MetricCard
            icon={<Users className="h-8 w-8 text-orange-500" />}
            title="Active Learners"
            value="12,847"
            change="+23%"
            positive={true}
          />
          <MetricCard
            icon={<Coins className="h-8 w-8 text-green-500" />}
            title="FLB Distributed"
            value="2.4M"
            change="+156%"
            positive={true}
          />
          <MetricCard
            icon={<BookOpen className="h-8 w-8 text-blue-500" />}
            title="Courses Available"
            value="847"
            change="+12%"
            positive={true}
          />
          <MetricCard
            icon={<Heart className="h-8 w-8 text-red-500" />}
            title="Health Facilities"
            value="6,656"
            change="+8%"
            positive={true}
          />
        </motion.div>

        {/* Technology Stack */}
        <TechnologyStack />
      </div>
    </main>
  )
}

function SystemOverview() {
  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="mr-2 h-5 w-5 text-orange-500" />
            FlameBorn Ecosystem Architecture
          </CardTitle>
          <CardDescription className="text-gray-400">
            Complete Learn & Earn system with blockchain-powered transparency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArchitectureCard
              title="Youth Layer"
              description="Learn, earn, and grow through verified educational content"
              features={[
                "Course completion rewards",
                "Peer review system",
                "Daily earning caps",
                "Progress tracking",
                "Achievement badges",
              ]}
              color="blue"
            />
            <ArchitectureCard
              title="Validator Layer"
              description="Quality control through decentralized review system"
              features={[
                "Submission review queue",
                "Batch operations",
                "Evidence verification",
                "Reputation scoring",
                "Analytics dashboard",
              ]}
              color="purple"
            />
            <ArchitectureCard
              title="Health Layer"
              description="Direct funding to verified African health facilities"
              features={[
                "Transparent donations",
                "Impact tracking",
                "Facility verification",
                "Real-time metrics",
                "Community governance",
              ]}
              color="green"
            />
          </div>
        </CardContent>
      </Card>

      {/* Token Economics */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Coins className="mr-2 h-5 w-5 text-orange-500" />
            FLB Token Economics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Token Distribution</h4>
              <div className="space-y-3">
                <TokenDistributionItem label="Health Facilities (70%)" percentage={70} color="green" />
                <TokenDistributionItem label="Platform Treasury (30%)" percentage={30} color="orange" />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Earning Mechanisms</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Course Completion</span>
                  <span className="text-white">10-100 FLB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Peer Review</span>
                  <span className="text-white">5-25 FLB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Community Action</span>
                  <span className="text-white">20-200 FLB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Cap</span>
                  <span className="text-orange-400">500 FLB</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function YouthDashboardPreview() {
  return (
    <div className="space-y-6">
      {/* Youth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">FLB Earned</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Courses</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Streak</p>
                <p className="text-2xl font-bold text-white">12 days</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Level</p>
                <p className="text-2xl font-bold text-white">7</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Preview */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
            Available Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CourseCard
              title="African Health Systems"
              description="Understanding healthcare delivery across Africa"
              reward={75}
              duration={45}
              difficulty="Intermediate"
              progress={0}
            />
            <CourseCard
              title="Community Health Workers"
              description="Training for frontline health advocates"
              reward={100}
              duration={60}
              difficulty="Advanced"
              progress={0}
            />
            <CourseCard
              title="Malaria Prevention"
              description="Evidence-based prevention strategies"
              reward={50}
              duration={30}
              difficulty="Beginner"
              progress={100}
              completed={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ValidatorPortalPreview() {
  return (
    <div className="space-y-6">
      {/* Validator Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Reviewed</p>
                <p className="text-2xl font-bold text-white">1,234</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Approval Rate</p>
                <p className="text-2xl font-bold text-white">87.3%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Today</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Queue Preview */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-orange-500" />
            Review Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SubmissionPreview
              title="Malaria Prevention Course Completion"
              user="0x1234...5678"
              type="COURSE_COMPLETION"
              flb={50}
              priority="HIGH"
              evidence={true}
            />
            <SubmissionPreview
              title="Community Health Project"
              user="0x2345...6789"
              type="PROJECT_SUBMISSION"
              flb={150}
              priority="MEDIUM"
              evidence={true}
            />
            <SubmissionPreview
              title="Peer Review: Nutrition Guidelines"
              user="0x3456...7890"
              type="PEER_REVIEW"
              flb={25}
              priority="LOW"
              evidence={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function HealthImpactPreview() {
  return (
    <div className="space-y-6">
      {/* Health Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Facilities</p>
                <p className="text-2xl font-bold text-white">6,656</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Lives Impacted</p>
                <p className="text-2xl font-bold text-white">2.4M</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Countries</p>
                <p className="text-2xl font-bold text-white">54</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">BNB Donated</p>
                <p className="text-2xl font-bold text-white">12,847</p>
              </div>
              <Coins className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Facilities */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="mr-2 h-5 w-5 text-orange-500" />
            Verified Health Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FacilityCard
              name="Lagos General Hospital"
              location="Lagos, Nigeria"
              type="Hospital"
              patients="5,200/month"
              impact="High"
            />
            <FacilityCard
              name="Nairobi Community Clinic"
              location="Nairobi, Kenya"
              type="Clinic"
              patients="1,800/month"
              impact="Medium"
            />
            <FacilityCard
              name="Cape Town Health Center"
              location="Cape Town, South Africa"
              type="Health Center"
              patients="3,100/month"
              impact="High"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TechnologyStack() {
  return (
    <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Zap className="mr-2 h-5 w-5 text-orange-500" />
          Technology Stack
        </CardTitle>
        <CardDescription className="text-gray-400">
          Built with cutting-edge technologies for scalability and security
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TechStackCard
            category="Frontend"
            technologies={["Next.js 15", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]}
            color="blue"
          />
          <TechStackCard
            category="Backend"
            technologies={["Node.js", "Prisma ORM", "PostgreSQL", "AI SDK", "Server Actions", "API Routes"]}
            color="green"
          />
          <TechStackCard
            category="Blockchain"
            technologies={["Solidity", "BNB Smart Chain", "OpenZeppelin", "Web3.js", "Smart Contracts", "IPFS"]}
            color="purple"
          />
          <TechStackCard
            category="Infrastructure"
            technologies={["Vercel", "Neon Database", "AI Integration", "Real-time APIs", "CDN", "Analytics"]}
            color="orange"
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Helper Components
function MetricCard({ icon, title, value, change, positive }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          {icon}
          <Badge className={positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>{change}</Badge>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ArchitectureCard({ title, description, features, color }) {
  const colorClasses = {
    blue: "border-blue-500/30 bg-blue-900/10",
    purple: "border-purple-500/30 bg-purple-900/10",
    green: "border-green-500/30 bg-green-900/10",
  }

  return (
    <Card className={`${colorClasses[color]} transition-colors hover:border-opacity-50`}>
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function TokenDistributionItem({ label, percentage, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color === "green" ? "bg-green-500" : "bg-orange-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function CourseCard({ title, description, reward, duration, difficulty, progress = 0, completed = false }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
            {reward} FLB
          </Badge>
        </div>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {duration} min
            </span>
            <span className="text-gray-400 capitalize">{difficulty}</span>
          </div>
          {completed ? (
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </Button>
          ) : (
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold">
              <Play className="mr-2 h-4 w-4" />
              Start Course
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function SubmissionPreview({ title, user, type, flb, priority, evidence }) {
  const getPriorityColor = () => {
    switch (priority) {
      case "HIGH":
        return "text-red-400 bg-red-900/20 border-red-800"
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-800"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-800"
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className="text-white font-medium">{title}</h4>
          <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
            {flb} FLB
          </Badge>
          <Badge variant="outline" className={getPriorityColor()}>
            {priority}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>{type.replace("_", " ")}</span>
          <span>{user}</span>
          {evidence && (
            <span className="flex items-center">
              <Eye className="mr-1 h-3 w-3" />
              Evidence
            </span>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="destructive">
          <ThumbsUp className="h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  )
}

function FacilityCard({ name, location, type, patients, impact }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm">{name}</CardTitle>
          <Shield className="h-4 w-4 text-orange-500" />
        </div>
        <CardDescription className="text-gray-400 text-xs">{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white">{type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Patients:</span>
            <span className="text-white">{patients}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Impact:</span>
            <Badge
              className={`text-xs ${impact === "High" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
            >
              {impact}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TechStackCard({ category, technologies, color }) {
  const colorClasses = {
    blue: "border-blue-500/30",
    green: "border-green-500/30",
    purple: "border-purple-500/30",
    orange: "border-orange-500/30",
  }

  return (
    <Card className={`bg-gray-900/50 ${colorClasses[color]}`}>
      <CardHeader>
        <CardTitle className="text-white text-lg">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center text-sm text-gray-300">
              <Star className="h-3 w-3 text-orange-500 mr-2 flex-shrink-0" />
              {tech}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
