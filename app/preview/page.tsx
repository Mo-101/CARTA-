"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
                <p className="text-green-400 text-sm font-medium">Funded</p>
                <p className="text-2xl font-bold text-white">$2.4M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
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
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Lives Impacted</p>
                <p className="text-2xl font-bold text-white">847K</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Facility Map Preview */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-orange-500" />
            Health Facility Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Top Funded Facilities</h4>
              <div className="space-y-3">
                <FacilityCard
                  name="Lagos University Teaching Hospital"
                  location="Lagos, Nigeria"
                  funding={45000}
                  patients={12500}
                />
                <FacilityCard
                  name="Kenyatta National Hospital"
                  location="Nairobi, Kenya"
                  funding={38000}
                  patients={9800}
                />
                <FacilityCard
                  name="Chris Hani Baragwanath Hospital"
                  location="Johannesburg, South Africa"
                  funding={52000}
                  patients={15200}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Regional Distribution</h4>
              <div className="space-y-2">
                <RegionBar region="West Africa" percentage={35} />
                <RegionBar region="East Africa" percentage={28} />
                <RegionBar region="Southern Africa" percentage={22} />
                <RegionBar region="Central Africa" percentage={10} />
                <RegionBar region="North Africa" percentage={5} />
              </div>
            </div>
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
          Built on cutting-edge blockchain and web technologies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="text-white font-medium">Blockchain</h4>
            <div className="space-y-2">
              <TechItem name="Binance Smart Chain" status="active" />
              <TechItem name="MetaMask Integration" status="active" />
              <TechItem name="Smart Contracts" status="active" />
              <TechItem name="Web3 Wallet" status="active" />
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-medium">Frontend</h4>
            <div className="space-y-2">
              <TechItem name="Next.js 14" status="active" />
              <TechItem name="React 18" status="active" />
              <TechItem name="Tailwind CSS" status="active" />
              <TechItem name="Framer Motion" status="active" />
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-medium">Backend</h4>
            <div className="space-y-2">
              <TechItem name="PostgreSQL" status="active" />
              <TechItem name="Prisma ORM" status="active" />
              <TechItem name="API Routes" status="active" />
              <TechItem name="Real-time Updates" status="active" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper Components
function MetricCard({ icon, title, value, change, positive }: any) {
  return (
    <Card className="bg-black/80 border-gray-800 backdrop-blur-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          {icon}
          <span className={`text-sm ${positive ? "text-green-400" : "text-red-400"}`}>{change}</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ArchitectureCard({ title, description, features, color }: any) {
  const colorClasses = {
    blue: "border-blue-500/30 bg-blue-500/10",
    purple: "border-purple-500/30 bg-purple-500/10",
    green: "border-green-500/30 bg-green-500/10",
  }

  return (
    <Card className={`${colorClasses[color]} backdrop-blur-md`}>
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
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

function TokenDistributionItem({ label, percentage, color }: any) {
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

function CourseCard({ title, description, reward, duration, difficulty, progress, completed }: any) {
  return (
    <Card className="bg-gray-900/50 border-gray-700 hover:border-orange-500/50 transition-colors">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="text-white font-medium text-sm">{title}</h4>
            {completed && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          <p className="text-gray-400 text-xs">{description}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-orange-400">{reward} FLB</span>
            <span className="text-gray-400">{duration} min</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {difficulty}
          </Badge>
          {progress > 0 && (
            <div className="w-full bg-gray-800 rounded-full h-1">
              <div className="h-1 rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function SubmissionPreview({ title, user, type, flb, priority, evidence }: any) {
  const priorityColors = {
    HIGH: "text-red-400 bg-red-500/20",
    MEDIUM: "text-yellow-400 bg-yellow-500/20",
    LOW: "text-green-400 bg-green-500/20",
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
      <div className="space-y-1">
        <h4 className="text-white font-medium text-sm">{title}</h4>
        <p className="text-gray-400 text-xs">{user}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
          <Badge className={`text-xs ${priorityColors[priority]}`}>{priority}</Badge>
        </div>
      </div>
      <div className="text-right space-y-1">
        <p className="text-orange-400 font-medium">{flb} FLB</p>
        <div className="flex items-center gap-1">
          {evidence ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-500" />
          )}
          <span className="text-xs text-gray-400">{evidence ? "Evidence" : "Pending"}</span>
        </div>
      </div>
    </div>
  )
}

function FacilityCard({ name, location, funding, patients }: any) {
  return (
    <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
      <h5 className="text-white font-medium text-sm">{name}</h5>
      <p className="text-gray-400 text-xs mb-2">{location}</p>
      <div className="flex justify-between text-xs">
        <span className="text-green-400">${funding.toLocaleString()} funded</span>
        <span className="text-blue-400">{patients.toLocaleString()} patients</span>
      </div>
    </div>
  )
}

function RegionBar({ region, percentage }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{region}</span>
        <span className="text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div className="h-2 rounded-full bg-orange-500" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function TechItem({ name, status }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-300 text-sm">{name}</span>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-green-400 text-xs">{status}</span>
      </div>
    </div>
  )
}
