"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Flame,
  BookOpen,
  Users,
  Trophy,
  Clock,
  Target,
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Calendar,
  Zap,
  MessageSquare,
  Gift,
  Coins,
  Timer,
  BarChart3,
  GraduationCap,
  Plus,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/contexts/WalletContext"
import { useYouthRewards } from "@/hooks/useYouthRewards"
import { ReviewSystem } from "@/components/review-system"
import { SubmissionModal } from "@/components/submission-modal"

// Animated background dots
const AnimatedDots = () => {
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: ["bg-orange-500", "bg-red-500", "bg-teal-500", "bg-blue-500", "bg-purple-500", "bg-green-500"][
      Math.floor(Math.random() * 6)
    ],
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${dot.color} opacity-20`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function YouthPage() {
  const { user, connectWallet } = useWallet()
  const {
    balance,
    dailyEarned,
    dailyLimit,
    level,
    experience,
    streak,
    achievements,
    courses,
    completeCourse,
    submitAction,
    loading,
  } = useYouthRewards()

  const [activeTab, setActiveTab] = useState("discover")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [focusTime, setFocusTime] = useState(0)
  const [isStudying, setIsStudying] = useState(false)

  // Focus timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStudying) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStudying])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressToNextLevel = ((experience % 1000) / 1000) * 100

  if (!user) {
    return (
      <main className="relative w-full h-screen overflow-hidden bg-black">
        <AnimatedDots />
        <Navigation />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="space-y-4">
              <GraduationCap className="h-20 w-20 text-orange-500 mx-auto" />
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-teal-400 to-red-500 bg-clip-text text-transparent">Youth</span>{" "}
                <span className="text-white">Learning Hub</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Learn, earn, and grow with blockchain-verified education. Complete courses, earn FLB tokens, and make a
                real impact on African health.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">🎓 Learn & Earn</Badge>
              <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 px-4 py-2">
                🔗 Blockchain Verified
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2">❤️ Health Impact</Badge>
            </div>

            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-teal-500 to-red-500 hover:from-teal-600 hover:to-red-600 text-white font-bold px-8 py-3 text-lg"
            >
              Connect Wallet to Start Learning
            </Button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative w-full min-h-screen bg-black">
      <AnimatedDots />
      <Navigation />

      <div className="relative z-10 pt-20 pb-8 px-4 space-y-8">
        {/* Header Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm font-medium">FLB Balance</p>
                  <p className="text-2xl font-bold text-white">{balance.toLocaleString()}</p>
                  <p className="text-xs text-orange-300">+{dailyEarned} today</p>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-teal-500/30 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-400 text-sm font-medium">Level {level}</p>
                  <p className="text-2xl font-bold text-white">{experience.toLocaleString()} XP</p>
                  <Progress value={progressToNextLevel} className="mt-1 h-1" />
                </div>
                <Trophy className="h-8 w-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">Study Streak</p>
                  <p className="text-2xl font-bold text-white">{streak} days</p>
                  <p className="text-xs text-red-300">Keep it up! 🔥</p>
                </div>
                <Target className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Daily Progress</p>
                  <p className="text-2xl font-bold text-white">
                    {dailyEarned}/{dailyLimit}
                  </p>
                  <Progress value={(dailyEarned / dailyLimit) * 100} className="mt-1 h-1" />
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 backdrop-blur-md">
            <TabsTrigger
              value="discover"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="learning"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              Community
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <Gift className="mr-2 h-4 w-4" />
              Rewards
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                    Featured Courses
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Start your learning journey with these recommended courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CourseCard
                          course={course}
                          onSelect={() => setSelectedCourse(course)}
                          onComplete={() => completeCourse(course.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Daily Challenges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-teal-500" />
                    Daily Challenges
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Complete these challenges to earn bonus FLB tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <ChallengeItem
                      title="Complete a course module"
                      reward={25}
                      progress={75}
                      icon={<BookOpen className="h-4 w-4" />}
                    />
                    <ChallengeItem
                      title="Study for 30 minutes"
                      reward={15}
                      progress={60}
                      icon={<Clock className="h-4 w-4" />}
                    />
                    <ChallengeItem
                      title="Help a peer with review"
                      reward={20}
                      progress={0}
                      icon={<Users className="h-4 w-4" />}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            {/* Focus Timer */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-black/80 border-red-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Timer className="mr-2 h-5 w-5 text-red-500" />
                    Focus Timer
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your study time and earn focus bonuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-white font-mono">{formatTime(focusTime)}</div>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={() => setIsStudying(!isStudying)}
                        className={`${
                          isStudying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        } text-white font-bold`}
                      >
                        {isStudying ? "Pause Study" : "Start Studying"}
                      </Button>
                      <Button
                        onClick={() => {
                          setFocusTime(0)
                          setIsStudying(false)
                        }}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Reset
                      </Button>
                    </div>
                    {focusTime >= 1800 && ( // 30 minutes
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Award className="mr-1 h-3 w-3" />
                        Focus bonus earned! +10 FLB
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* My Courses */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-black/80 border-purple-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                    My Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses
                      .filter((c) => c.progress > 0)
                      .map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-medium">{course.title}</h4>
                            <span className="text-sm text-gray-400">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>{course.difficulty}</span>
                            <span>{course.duration} min</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            {/* Leaderboard */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-black/80 border-yellow-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                    Community Leaderboard
                  </CardTitle>
                  <CardDescription className="text-gray-400">Top learners this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Alice Johnson", tokens: 2847, rank: 1 },
                      { name: "Bob Smith", tokens: 2156, rank: 2 },
                      { name: "You", tokens: balance, rank: 3 },
                      { name: "Carol Davis", tokens: 1923, rank: 4 },
                      { name: "David Wilson", tokens: 1756, rank: 5 },
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              user.rank === 1
                                ? "bg-yellow-500 text-black"
                                : user.rank === 2
                                  ? "bg-gray-400 text-black"
                                  : user.rank === 3
                                    ? "bg-orange-500 text-black"
                                    : "bg-gray-700 text-white"
                            }`}
                          >
                            {user.rank}
                          </div>
                          <div>
                            <p className={`font-medium ${user.name === "You" ? "text-orange-400" : "text-white"}`}>
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-400">{user.tokens.toLocaleString()} FLB</p>
                          </div>
                        </div>
                        {user.rank <= 3 && (
                          <Trophy
                            className={`h-5 w-5 ${
                              user.rank === 1
                                ? "text-yellow-500"
                                : user.rank === 2
                                  ? "text-gray-400"
                                  : "text-orange-500"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Peer Reviews */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-black/80 border-blue-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                    Peer Review Requests
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Help others and earn FLB tokens by reviewing their submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <PeerReviewItem
                      title="Malaria Prevention Project"
                      author="Sarah M."
                      reward={15}
                      timeLeft="2 hours"
                      type="project"
                    />
                    <PeerReviewItem
                      title="Community Health Essay"
                      author="John D."
                      reward={10}
                      timeLeft="5 hours"
                      type="essay"
                    />
                    <PeerReviewItem
                      title="Nutrition Guidelines Summary"
                      author="Maria L."
                      reward={12}
                      timeLeft="1 day"
                      type="summary"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            {/* Achievements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-black/80 border-green-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="mr-2 h-5 w-5 text-green-500" />
                    Achievements
                  </CardTitle>
                  <CardDescription className="text-gray-400">Your learning milestones and badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border text-center ${
                          achievement.unlocked
                            ? "bg-green-500/20 border-green-500/30"
                            : "bg-gray-800/50 border-gray-700"
                        }`}
                      >
                        <div className={`text-2xl mb-2 ${achievement.unlocked ? "grayscale-0" : "grayscale"}`}>
                          {achievement.icon}
                        </div>
                        <h4 className={`font-medium text-sm ${achievement.unlocked ? "text-white" : "text-gray-500"}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-xs mt-1 ${achievement.unlocked ? "text-green-400" : "text-gray-600"}`}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2 text-xs">
                            +{achievement.reward} FLB
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Token History */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Coins className="mr-2 h-5 w-5 text-orange-500" />
                    Recent FLB Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <TokenHistoryItem
                      action="Course Completion"
                      course="Malaria Prevention"
                      amount={50}
                      time="2 hours ago"
                      type="earned"
                    />
                    <TokenHistoryItem
                      action="Daily Challenge"
                      course="Study Timer"
                      amount={15}
                      time="4 hours ago"
                      type="earned"
                    />
                    <TokenHistoryItem
                      action="Peer Review"
                      course="Community Health"
                      amount={20}
                      time="1 day ago"
                      type="earned"
                    />
                    <TokenHistoryItem
                      action="Achievement Unlock"
                      course="First Week"
                      amount={100}
                      time="2 days ago"
                      type="bonus"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit Action */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-black/80 border-purple-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                    Submit for Review
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Submit your work for validator review and earn FLB tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowSubmissionModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Action
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCourse.title}</DialogTitle>
                <DialogDescription className="text-gray-400">{selectedCourse.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{selectedCourse.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{selectedCourse.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-400">{selectedCourse.reward} FLB</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Course Content</h3>
                  <div className="space-y-2">
                    {selectedCourse.modules?.map((module, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <span className="text-white">{module}</span>
                        </div>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Course Reviews</h3>
                  <ReviewSystem
                    targetId={selectedCourse.id}
                    targetType="COURSE"
                    targetTitle={selectedCourse.title}
                    compact={false}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={() => {
                      completeCourse(selectedCourse.id)
                      setSelectedCourse(null)
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    disabled={selectedCourse.completed}
                  >
                    {selectedCourse.completed ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Course
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCourse(null)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Submission Modal */}
        <SubmissionModal open={showSubmissionModal} onOpenChange={setShowSubmissionModal} onSubmit={submitAction} />
      </div>
    </main>
  )
}

// Helper Components
function CourseCard({ course, onSelect, onComplete }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group">
      <CardContent className="p-4" onClick={onSelect}>
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-white group-hover:text-orange-400 transition-colors">{course.title}</h3>
            <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
              {course.reward} FLB
            </Badge>
          </div>

          <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {course.duration} min
            </span>
            <span className="capitalize">{course.difficulty}</span>
          </div>

          {course.progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <ReviewSystem targetId={course.id} targetType="COURSE" compact={true} />

            {course.completed ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            ) : (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onComplete()
                }}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
              >
                <Play className="mr-1 h-3 w-3" />
                Start
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChallengeItem({ title, reward, progress, icon }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">{icon}</div>
        <div>
          <p className="text-white font-medium text-sm">{title}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Progress value={progress} className="w-20 h-1" />
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
        </div>
      </div>
      <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">+{reward} FLB</Badge>
    </div>
  )
}

function PeerReviewItem({ title, author, reward, timeLeft, type }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
          <span>by {author}</span>
          <span>⏰ {timeLeft} left</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">+{reward} FLB</Badge>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
          Review
        </Button>
      </div>
    </div>
  )
}

function TokenHistoryItem({ action, course, amount, time, type }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            type === "earned"
              ? "bg-green-500/20 text-green-400"
              : type === "bonus"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-orange-500/20 text-orange-400"
          }`}
        >
          {type === "earned" ? (
            <TrendingUp className="h-4 w-4" />
          ) : type === "bonus" ? (
            <Award className="h-4 w-4" />
          ) : (
            <Coins className="h-4 w-4" />
          )}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{action}</p>
          <p className="text-xs text-gray-400">
            {course} • {time}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-green-400 font-bold">+{amount} FLB</p>
      </div>
    </div>
  )
}
