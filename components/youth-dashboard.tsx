"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Flame, BookOpen, Target, Calendar, TrendingUp, Award, Clock, Zap } from "lucide-react"
import { useYouthRewards } from "@/hooks/useYouthRewards"
import { useWallet } from "@/contexts/WalletContext"

export function YouthDashboard() {
  const { user } = useWallet()
  const { actions, progress, courses, loading, error, completeCourse, getDailyStats } = useYouthRewards()

  const [selectedCourse, setSelectedCourse] = useState(null)
  const dailyStats = getDailyStats()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400">Connect your wallet to start learning and earning FLB tokens</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm font-medium">Total FLB Earned</p>
                  <p className="text-2xl font-bold text-white">{progress?.totalFLBEarned || 0}</p>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Courses Completed</p>
                  <p className="text-2xl font-bold text-white">{progress?.coursesCompleted || 0}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Current Streak</p>
                  <p className="text-2xl font-bold text-white">{progress?.currentStreak || 0} days</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm font-medium">Level</p>
                  <p className="text-2xl font-bold text-white">{progress?.level || 1}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Daily Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-orange-500" />
              Daily Progress
            </CardTitle>
            <CardDescription className="text-gray-400">
              Track your daily FLB earnings and stay within the daily cap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Today's Earnings</span>
                <span className="text-orange-400 font-bold">{dailyStats.earned} / 500 FLB</span>
              </div>
              <Progress value={(dailyStats.earned / 500) * 100} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Remaining: {dailyStats.remaining} FLB</span>
                <span className="text-gray-400">{((dailyStats.earned / 500) * 100).toFixed(1)}% of daily cap</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
          <TabsTrigger value="courses" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            Available Courses
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            My Progress
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
            Reward History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg">{course.name}</CardTitle>
                      <Badge variant="outline" className="bg-orange-900/30 text-orange-400 border-orange-800">
                        {course.rewardAmount} FLB
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.duration} min
                        </span>
                        <span className="text-gray-400 capitalize">{course.difficulty}</span>
                      </div>
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                        onClick={() => setSelectedCourse(course)}
                        disabled={dailyStats.remaining < course.rewardAmount}
                      >
                        {dailyStats.remaining < course.rewardAmount ? (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Daily Cap Reached
                          </>
                        ) : (
                          <>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Course
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Level Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Level {progress?.level || 1}</span>
                    <span className="text-orange-400">{(progress?.totalFLBEarned || 0) % 1000} / 1000 FLB</span>
                  </div>
                  <Progress value={((progress?.totalFLBEarned || 0) % 1000) / 10} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">
                    {1000 - ((progress?.totalFLBEarned || 0) % 1000)} FLB to next level
                  </p>
                </div>

                {/* Badges */}
                {progress?.badges && progress.badges.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Award className="mr-2 h-4 w-4 text-yellow-500" />
                      Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {progress.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-yellow-900/30 text-yellow-400 border-yellow-800"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Flame className="mr-2 h-5 w-5 text-orange-500" />
                Recent Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actions.length > 0 ? (
                  actions.slice(0, 10).map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-gray-800"
                    >
                      <div>
                        <p className="text-white font-medium">{action.actionType.replace("_", " ")}</p>
                        {action.description && <p className="text-gray-400 text-sm">{action.description}</p>}
                        <p className="text-gray-500 text-xs">{new Date(action.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-bold">+{action.flbAmount} FLB</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Flame className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No rewards yet. Complete your first course to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
