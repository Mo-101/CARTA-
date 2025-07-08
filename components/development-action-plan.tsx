"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, Zap, Target, Users, Flame } from "lucide-react"

interface ActionItem {
  id: string
  title: string
  priority: "critical" | "high" | "medium" | "low"
  timeline: string
  effort: "1-day" | "1-week" | "2-weeks" | "1-month" | "ongoing"
  dependencies: string[]
  assignee: string
  status: "not-started" | "in-progress" | "blocked" | "completed"
  description: string
  risks: string[]
  successMetrics: string[]
}

export function DevelopmentActionPlan() {
  const [activeTab, setActiveTab] = useState("critical-path")

  const actionItems: ActionItem[] = [
    {
      id: "smart-contracts",
      title: "Deploy Smart Contracts to BSC Mainnet",
      priority: "critical",
      timeline: "72 hours",
      effort: "1-week",
      dependencies: ["Security audit", "Multi-sig wallet setup"],
      assignee: "Blockchain Team",
      status: "in-progress",
      description:
        "Deploy FLB token contract and reward distribution system to BSC mainnet with proper security measures",
      risks: ["Security vulnerabilities", "Gas fee optimization", "Contract upgrade path"],
      successMetrics: ["Contract deployed", "Token transfers working", "Reward distribution functional"],
    },
    {
      id: "openai-integration",
      title: "Fix OpenAI API Integration",
      priority: "critical",
      timeline: "24 hours",
      effort: "1-day",
      dependencies: ["API key procurement", "Environment setup"],
      assignee: "Backend Developer",
      status: "not-started",
      description: "Integrate OpenAI API key and replace mock responses in Trading Dashboard",
      risks: ["API rate limits", "Cost management"],
      successMetrics: ["Real AI responses", "Trading advice functional", "Cost under $100/month"],
    },
    {
      id: "video-player",
      title: "Implement Course Content Player",
      priority: "high",
      timeline: "2 weeks",
      effort: "2-weeks",
      dependencies: ["Video hosting provider", "Quiz system design"],
      assignee: "Frontend Team",
      status: "not-started",
      description: "Build video player with interactive quizzes and progress tracking for course delivery",
      risks: ["Video hosting costs", "Bandwidth optimization", "Mobile compatibility"],
      successMetrics: ["Video playback working", "Quiz system functional", "Progress tracking accurate"],
    },
    {
      id: "health-api",
      title: "Connect Real Health Data Sources",
      priority: "high",
      timeline: "3 weeks",
      effort: "1-month",
      dependencies: ["Health organization partnerships", "API agreements"],
      assignee: "Data Team + Business Development",
      status: "not-started",
      description: "Replace mock health facility data with real partnerships and API integrations",
      risks: ["Partnership delays", "Data quality issues", "Compliance requirements"],
      successMetrics: ["3 pilot countries connected", "Real facility data flowing", "Impact metrics accurate"],
    },
    {
      id: "mobile-app",
      title: "Launch Mobile App MVP",
      priority: "medium",
      timeline: "6 weeks",
      effort: "1-month",
      dependencies: ["React Native setup", "Core features ported"],
      assignee: "Mobile Team",
      status: "not-started",
      description: "Create React Native app with offline learning capabilities and push notifications",
      risks: ["Platform fragmentation", "App store approval", "Offline sync complexity"],
      successMetrics: ["App published", "Offline learning works", "Push notifications functional"],
    },
    {
      id: "validator-growth",
      title: "Scale Validator Network",
      priority: "medium",
      timeline: "4 weeks",
      effort: "ongoing",
      dependencies: ["Validator training program", "Reputation system"],
      assignee: "Community Team",
      status: "in-progress",
      description: "Launch validator incubator program and implement tiered reward system",
      risks: ["Quality control", "Validator retention", "Gaming prevention"],
      successMetrics: ["500+ active validators", "90%+ approval accuracy", "24h review turnaround"],
    },
  ]

  const criticalItems = actionItems.filter((item) => item.priority === "critical")
  const highPriorityItems = actionItems.filter((item) => item.priority === "high")
  const mediumPriorityItems = actionItems.filter((item) => item.priority === "medium")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "blocked":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Flame className="mr-2 h-5 w-5 text-orange-500" />
            Strategic Development Action Plan
          </CardTitle>
          <CardDescription className="text-gray-400">
            Critical path analysis and resource allocation for accelerated platform completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{criticalItems.length}</div>
              <div className="text-sm text-gray-400">Critical Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{highPriorityItems.length}</div>
              <div className="text-sm text-gray-400">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">72h</div>
              <div className="text-sm text-gray-400">Critical Timeline</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">85%</div>
              <div className="text-sm text-gray-400">Target Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Plan Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900/50">
          <TabsTrigger value="critical-path" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            Critical Path
          </TabsTrigger>
          <TabsTrigger
            value="resource-plan"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
          >
            Resource Plan
          </TabsTrigger>
          <TabsTrigger value="risk-matrix" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Risk Matrix
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
            Timeline
          </TabsTrigger>
        </TabsList>

        {/* Critical Path */}
        <TabsContent value="critical-path" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">🚨 Critical Path Items (Block Everything)</h3>
            {criticalItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ActionItemCard item={item} />
              </motion.div>
            ))}

            <h3 className="text-xl font-bold text-white mt-8">🔥 High Priority Items</h3>
            {highPriorityItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ActionItemCard item={item} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Resource Plan */}
        <TabsContent value="resource-plan" className="space-y-4">
          <ResourceAllocationPlan />
        </TabsContent>

        {/* Risk Matrix */}
        <TabsContent value="risk-matrix" className="space-y-4">
          <RiskMatrix actionItems={actionItems} />
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline" className="space-y-4">
          <DevelopmentTimeline actionItems={actionItems} />
        </TabsContent>
      </Tabs>

      {/* Quick Wins */}
      <Card className="bg-black/80 border-green-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="mr-2 h-5 w-5 text-green-500" />
            Immediate Quick Wins (Next 48 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickWinCard
              title="OpenAI API Integration"
              description="Add API key and replace mock responses"
              effort="2 hours"
              impact="High"
              assignee="Backend Dev"
            />
            <QuickWinCard
              title="Video Hosting Research"
              description="Evaluate Vimeo Pro, Loom, and IPFS options"
              effort="4 hours"
              impact="Medium"
              assignee="Frontend Lead"
            />
            <QuickWinCard
              title="Health Partnership Outreach"
              description="Contact WHO, Kenya MOH, Nigeria FMOH"
              effort="6 hours"
              impact="High"
              assignee="Business Dev"
            />
            <QuickWinCard
              title="Smart Contract Audit Prep"
              description="Prepare contracts for security review"
              effort="8 hours"
              impact="Critical"
              assignee="Blockchain Team"
            />
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics Dashboard */}
      <Card className="bg-black/80 border-blue-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="mr-2 h-5 w-5 text-blue-500" />
            Success Metrics & KPIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard title="Platform Completion" current={62} target={85} unit="%" timeline="6 weeks" color="blue" />
            <MetricCard
              title="Critical Issues Resolved"
              current={0}
              target={2}
              unit="issues"
              timeline="72 hours"
              color="red"
            />
            <MetricCard
              title="Real Data Integration"
              current={0}
              target={3}
              unit="countries"
              timeline="3 weeks"
              color="green"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ActionItemCard({ item }: { item: ActionItem }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "blocked":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon(item.status)}
            <div>
              <CardTitle className="text-white text-lg">{item.title}</CardTitle>
              <CardDescription className="text-gray-400">{item.description}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getPriorityColor(item.priority)}>{item.priority.toUpperCase()}</Badge>
            <Badge variant="outline" className="text-xs">
              {item.timeline}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Assignment and Effort */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">{item.assignee}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">{item.effort}</span>
            </div>
          </div>

          {/* Dependencies */}
          {item.dependencies.length > 0 && (
            <div>
              <h4 className="text-white font-medium text-sm mb-2">Dependencies</h4>
              <div className="flex flex-wrap gap-1">
                {item.dependencies.map((dep, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Risks */}
          {item.risks.length > 0 && (
            <div>
              <h4 className="text-red-400 font-medium text-sm mb-2">Risks</h4>
              <ul className="space-y-1">
                {item.risks.map((risk, index) => (
                  <li key={index} className="text-red-400 text-xs flex items-start">
                    <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Success Metrics */}
          <div>
            <h4 className="text-green-400 font-medium text-sm mb-2">Success Metrics</h4>
            <ul className="space-y-1">
              {item.successMetrics.map((metric, index) => (
                <li key={index} className="text-green-400 text-xs flex items-start">
                  <CheckCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                  {metric}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <Button
            className={`w-full ${
              item.priority === "critical"
                ? "bg-red-500 hover:bg-red-600"
                : item.priority === "high"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold`}
          >
            {item.status === "not-started" ? "Start Task" : item.status === "in-progress" ? "Continue" : "Review"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ResourceAllocationPlan() {
  return (
    <div className="space-y-6">
      <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Team Allocation Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Strike Teams Formation</h4>
              <div className="space-y-3">
                <TeamCard
                  name="Blockchain Strike Team"
                  members={["Senior Blockchain Dev", "Smart Contract Auditor", "DevOps Engineer"]}
                  focus="Smart contract deployment & security"
                  timeline="72 hours"
                  priority="critical"
                />
                <TeamCard
                  name="Content Delivery Team"
                  members={["Frontend Lead", "Video Engineer", "UX Designer"]}
                  focus="Course content player & video hosting"
                  timeline="2 weeks"
                  priority="high"
                />
                <TeamCard
                  name="Data Integration Team"
                  members={["Backend Dev", "Data Engineer", "Business Dev"]}
                  focus="Health API partnerships & integration"
                  timeline="3 weeks"
                  priority="high"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Resource Reallocation</h4>
              <div className="space-y-3">
                <ReallocationCard
                  from="Low-priority features (Multi-language, Geolocation)"
                  to="Critical path items"
                  developers={2}
                  impact="Accelerate completion by 3 weeks"
                />
                <ReallocationCard
                  from="Community features enhancement"
                  to="Mobile app MVP development"
                  developers={1}
                  impact="Parallel mobile development"
                />
                <ReallocationCard
                  from="Advanced trading features"
                  to="Health data integration"
                  developers={1}
                  impact="Real data credibility boost"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RiskMatrix({ actionItems }: { actionItems: ActionItem[] }) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/80 border-red-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Risk Assessment & Mitigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">High-Impact Risks</h4>
              <div className="space-y-3">
                <RiskCard
                  title="Smart Contract Security Vulnerability"
                  probability="Medium"
                  impact="Critical"
                  mitigation="Comprehensive audit + multi-sig + emergency pause"
                  owner="Blockchain Team"
                />
                <RiskCard
                  title="Health Partnership Delays"
                  probability="High"
                  impact="High"
                  mitigation="Start with public APIs + 3 pilot countries"
                  owner="Business Dev"
                />
                <RiskCard
                  title="Video Hosting Cost Overrun"
                  probability="Medium"
                  impact="Medium"
                  mitigation="Implement CDN + compression + usage caps"
                  owner="DevOps"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Contingency Plans</h4>
              <div className="space-y-3">
                <ContingencyCard
                  scenario="Smart Contract Deployment Fails"
                  backup="Deploy to Polygon as fallback network"
                  timeline="24 hours"
                />
                <ContingencyCard
                  scenario="Video Hosting Provider Issues"
                  backup="Multi-provider setup (Vimeo + IPFS)"
                  timeline="48 hours"
                />
                <ContingencyCard
                  scenario="Health API Access Denied"
                  backup="User-submitted verification system"
                  timeline="1 week"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DevelopmentTimeline({ actionItems }: { actionItems: ActionItem[] }) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/80 border-green-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Development Timeline & Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <TimelinePhase
              phase="Week 1: Critical Foundation"
              items={[
                "Deploy smart contracts to testnet",
                "Integrate OpenAI API",
                "Select video hosting provider",
                "Initiate health partnerships",
              ]}
              color="red"
            />
            <TimelinePhase
              phase="Week 2-3: Core Features"
              items={[
                "Deploy to BSC mainnet",
                "Launch course content player",
                "Connect first health data source",
                "Begin mobile app development",
              ]}
              color="orange"
            />
            <TimelinePhase
              phase="Week 4-6: Integration & Scale"
              items={[
                "Full video course catalog",
                "3 countries health data live",
                "Mobile app beta release",
                "Validator network expansion",
              ]}
              color="green"
            />
            <TimelinePhase
              phase="Week 7-8: Polish & Launch"
              items={[
                "Performance optimization",
                "Security hardening",
                "Marketing campaign launch",
                "Community growth initiatives",
              ]}
              color="blue"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper Components
function QuickWinCard({ title, description, effort, impact, assignee }: any) {
  return (
    <Card className="bg-gray-900/50 border-green-500/30">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h4 className="text-white font-medium">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
          <div className="flex justify-between items-center">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{effort}</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{impact} Impact</Badge>
          </div>
          <div className="text-xs text-gray-500">Assigned: {assignee}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function MetricCard({ title, current, target, unit, timeline, color }: any) {
  const percentage = (current / target) * 100

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h4 className="text-white font-medium">{title}</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">
                {current}/{target} {unit}
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          <div className="text-xs text-gray-500">Target: {timeline}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function TeamCard({ name, members, focus, timeline, priority }: any) {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="text-white font-medium">{name}</h4>
            <Badge
              className={priority === "critical" ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"}
            >
              {priority}
            </Badge>
          </div>
          <p className="text-gray-400 text-sm">{focus}</p>
          <div className="text-xs text-gray-500">Timeline: {timeline}</div>
          <div className="space-y-1">
            {members.map((member: string, index: number) => (
              <div key={index} className="text-xs text-gray-400">
                • {member}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReallocationCard({ from, to, developers, impact }: any) {
  return (
    <Card className="bg-gray-900/50 border-blue-500/30">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-red-400">From:</span> <span className="text-gray-300">{from}</span>
          </div>
          <div className="text-sm">
            <span className="text-green-400">To:</span> <span className="text-gray-300">{to}</span>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="outline">{developers} developers</Badge>
            <span className="text-xs text-blue-400">{impact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RiskCard({ title, probability, impact, mitigation, owner }: any) {
  return (
    <Card className="bg-gray-900/50 border-red-500/30">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          <div className="flex justify-between">
            <Badge className="bg-yellow-500/20 text-yellow-400">{probability}</Badge>
            <Badge className="bg-red-500/20 text-red-400">{impact}</Badge>
          </div>
          <p className="text-gray-400 text-xs">{mitigation}</p>
          <div className="text-xs text-gray-500">Owner: {owner}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function ContingencyCard({ scenario, backup, timeline }: any) {
  return (
    <Card className="bg-gray-900/50 border-orange-500/30">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">{scenario}</h4>
          <p className="text-gray-400 text-xs">{backup}</p>
          <Badge className="bg-orange-500/20 text-orange-400">{timeline}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function TimelinePhase({ phase, items, color }: any) {
  const colorClasses = {
    red: "border-red-500/30 bg-red-500/10",
    orange: "border-orange-500/30 bg-orange-500/10",
    green: "border-green-500/30 bg-green-500/10",
    blue: "border-blue-500/30 bg-blue-500/10",
  }

  return (
    <Card className={`${colorClasses[color]} backdrop-blur-md`}>
      <CardContent className="p-4">
        <h4 className="text-white font-medium mb-3">{phase}</h4>
        <ul className="space-y-2">
          {items.map((item: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
