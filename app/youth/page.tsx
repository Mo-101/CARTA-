"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Flame,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  Heart,
  Coins,
  Target,
  Clock,
  Play,
  CheckCircle,
  Star,
  Trophy,
  Zap,
  Globe,
  ArrowRight,
  Search,
  ChevronRight,
  Sparkles,
  Gift,
  Calendar,
  MessageCircle,
  Share2,
  Pause,
  Download,
  Eye,
  ThumbsUp,
  MapPin,
  Wifi,
  Battery,
  Signal,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/contexts/WalletContext"
import { useYouthRewards } from "@/hooks/useYouthRewards"

export default function YouthPage() {
  const { user, isConnected, connect } = useWallet()
  const { progress, courses, actions, loading, getDailyStats } = useYouthRewards()
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNotification, setShowNotification] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Show welcome notification
  useEffect(() => {
    if (isConnected && user) {
      setShowNotification(true)
      const timer = setTimeout(() => setShowNotification(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isConnected, user])

  const dailyStats = getDailyStats()

  if (!isConnected) {
    return <YouthLandingPage onConnect={connect} />
  }

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />

      {/* Animated Background Dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AnimatedDots />
      </div>

      {/* Mobile Status Bar */}
      <div className="md:hidden bg-black/90 backdrop-blur-md px-4 py-2 flex justify-between items-center text-white text-sm relative z-10">
        <div className="flex items-center space-x-1">
          <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Signal className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
        </div>
      </div>

      {/* Welcome Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-gradient-to-r from-teal-500 to-red-500 border-none shadow-2xl">
              <CardContent className="p-4 flex items-center space-x-3">
                <Sparkles className="h-6 w-6 text-white animate-pulse" />
                <div>
                  <p className="text-white font-bold">Welcome back, {user?.name}! 🔥</p>
                  <p className="text-white/80 text-sm">Ready to earn some FLB tokens today?</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-20 pb-8 px-4 space-y-6 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500/20 via-red-500/20 to-teal-500/20 border border-teal-500/30 backdrop-blur-md p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-red-500/10 animate-pulse"></div>
          <div className="relative flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-teal-500">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-teal-500 text-white font-bold text-xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Hey {user?.name}! 👋</h1>
                <p className="text-teal-300">Level {user?.level} Health Hero</p>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Lagos, Nigeria</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                <Coins className="h-6 w-6 text-red-500" />
                <span className="text-2xl font-bold text-white">{user?.flbBalance?.toLocaleString()}</span>
                <span className="text-teal-400">FLB</span>
              </div>
              <p className="text-gray-400 text-sm">Available Balance</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <QuickStatCard
            icon={<Target className="h-6 w-6 text-teal-500" />}
            value={`${progress?.currentStreak || 0}`}
            label="Day Streak"
            color="teal"
            animate={true}
          />
          <QuickStatCard
            icon={<BookOpen className="h-6 w-6 text-red-500" />}
            value={`${progress?.coursesCompleted || 0}`}
            label="Completed"
            color="red"
          />
          <QuickStatCard
            icon={<Trophy className="h-6 w-6 text-yellow-500" />}
            value={`${progress?.badges?.length || 0}`}
            label="Badges"
            color="yellow"
          />
          <QuickStatCard
            icon={<Users className="h-6 w-6 text-purple-500" />}
            value="12.8K"
            label="Community"
            color="purple"
          />
        </motion.div>

        {/* Daily Challenge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-r from-red-500/20 to-teal-500/20 border-red-500/30 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500/20 rounded-full">
                    <Gift className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Daily Challenge</h3>
                    <p className="text-red-300 text-sm">Complete 2 courses today</p>
                  </div>
                </div>
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">+100 FLB</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-teal-300">1/2 courses</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 backdrop-blur-md rounded-2xl p-1">
            <TabsTrigger
              value="discover"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl font-medium"
            >
              🔥 Discover
            </TabsTrigger>
            <TabsTrigger
              value="learning"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl font-medium"
            >
              📚 Learning
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl font-medium"
            >
              👥 Community
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl font-medium"
            >
              🏆 Rewards
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6 mt-6">
            <DiscoverSection courses={courses} loading={loading} />
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6 mt-6">
            <LearningSection
              courses={courses}
              progress={progress}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6 mt-6">
            <CommunitySection />
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6 mt-6">
            <RewardsSection progress={progress} actions={actions} dailyStats={dailyStats} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function AnimatedDots() {
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: ["teal", "red", "yellow", "purple", "blue", "green"][Math.floor(Math.random() * 6)],
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  const getColorClass = (color: string) => {
    switch (color) {
      case "teal":
        return "bg-teal-500"
      case "red":
        return "bg-red-500"
      case "yellow":
        return "bg-yellow-500"
      case "purple":
        return "bg-purple-500"
      case "blue":
        return "bg-blue-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-teal-500"
    }
  }

  return (
    <div className="absolute inset-0">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${getColorClass(dot.color)} opacity-20`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
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

function YouthLandingPage({ onConnect }: { onConnect: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const heroSlides = [
    {
      title: "Learn African Health",
      subtitle: "Master health sciences with courses designed for Africa",
      emoji: "🏥",
      color: "from-teal-500 to-red-500",
    },
    {
      title: "Earn FLB Tokens",
      subtitle: "Get rewarded for every course you complete",
      emoji: "💰",
      color: "from-red-500 to-teal-500",
    },
    {
      title: "Impact Communities",
      subtitle: "Your learning directly funds African health facilities",
      emoji: "❤️",
      color: "from-teal-500 to-red-500",
    },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying, heroSlides.length])

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatedDots />
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative pt-20 pb-8 px-4 z-10">
        {/* Hero Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-4xl mx-auto mb-16"
        >
          <div className="relative h-80 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
              >
                <div
                  className={`text-8xl mb-4 animate-bounce bg-gradient-to-r ${heroSlides[currentSlide].color} bg-clip-text text-transparent`}
                >
                  {heroSlides[currentSlide].emoji}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white">{heroSlides[currentSlide].title}</h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">{heroSlides[currentSlide].subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-teal-500 w-8" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-gray-400 hover:text-white transition-colors">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
        >
          <ImpactStatCard
            icon={<Users className="h-12 w-12 text-teal-500" />}
            value="12,847"
            label="Active Learners"
            description="Young Africans earning while learning"
            delay={0.1}
          />
          <ImpactStatCard
            icon={<Heart className="h-12 w-12 text-red-500" />}
            value="2.4M"
            label="Lives Impacted"
            description="Through funded health facilities"
            delay={0.2}
          />
          <ImpactStatCard
            icon={<Globe className="h-12 w-12 text-teal-500" />}
            value="54"
            label="Countries"
            description="Across the African continent"
            delay={0.3}
          />
        </motion.div>

        {/* Connect CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          <Button
            onClick={onConnect}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-red-500 hover:from-teal-600 hover:to-red-600 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Flame className="mr-3 h-8 w-8" />
            Start Your Journey
            <ArrowRight className="ml-3 h-8 w-8" />
          </Button>
          <p className="text-gray-400 text-lg">🔥 Zero cost • 💰 Earn FLB tokens • 🌍 Impact Africa</p>
        </motion.div>

        {/* Feature Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Makes Us Different?</h2>
            <p className="text-gray-400 text-lg">The first gamified health education platform built for Africa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎮"
              title="Gamified Learning"
              description="Levels, badges, streaks, and rewards make learning addictive"
              color="from-red-500/20 to-teal-500/20"
              border="border-red-500/30"
            />
            <FeatureCard
              icon="🌍"
              title="African-Focused"
              description="Content designed specifically for African health challenges"
              color="from-teal-500/20 to-red-500/20"
              border="border-teal-500/30"
            />
            <FeatureCard
              icon="💰"
              title="Earn While Learning"
              description="Get FLB tokens for every course completed and milestone reached"
              color="from-red-500/20 to-teal-500/20"
              border="border-red-500/30"
            />
            <FeatureCard
              icon="🏥"
              title="Real Impact"
              description="70% of tokens fund verified African health facilities"
              color="from-teal-500/20 to-red-500/20"
              border="border-teal-500/30"
            />
            <FeatureCard
              icon="👥"
              title="Community Driven"
              description="Learn together, compete, and support each other"
              color="from-red-500/20 to-teal-500/20"
              border="border-red-500/30"
            />
            <FeatureCard
              icon="📱"
              title="Mobile First"
              description="Optimized for smartphones with offline capabilities"
              color="from-teal-500/20 to-red-500/20"
              border="border-teal-500/30"
            />
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function QuickStatCard({ icon, value, label, color, animate = false }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className={`bg-${color}-500/10 border-${color}-500/30 backdrop-blur-md`}>
        <CardContent className="p-4 text-center">
          <div className="flex justify-center mb-2">
            {animate ? (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {icon}
              </motion.div>
            ) : (
              icon
            )}
          </div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-sm">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function DiscoverSection({ courses, loading }) {
  const featuredCourses = courses.slice(0, 3)
  const trendingTopics = [
    { name: "Malaria Prevention", count: "2.3K learners", emoji: "🦟" },
    { name: "Maternal Health", count: "1.8K learners", emoji: "🤱" },
    { name: "Nutrition", count: "1.5K learners", emoji: "🥗" },
    { name: "Mental Health", count: "1.2K learners", emoji: "🧠" },
  ]

  return (
    <div className="space-y-8">
      {/* Featured Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">🔥 Featured Courses</h2>
          <Button variant="ghost" className="text-teal-400 hover:text-teal-300">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <FeaturedCourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">📈 Trending Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-teal-500/50 transition-all">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{topic.emoji}</div>
                  <p className="text-white font-medium text-sm">{topic.name}</p>
                  <p className="text-gray-400 text-xs">{topic.count}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Spotlight */}
      <Card className="bg-gradient-to-r from-teal-500/20 to-red-500/20 border-teal-500/30 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-teal-500/20 rounded-full">
              <Sparkles className="h-8 w-8 text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">Daily Spotlight</h3>
              <p className="text-teal-300">Community Health Workers Training</p>
              <p className="text-gray-400 text-sm mt-1">
                Learn how to become a certified community health advocate in your area
              </p>
            </div>
            <Button className="bg-gradient-to-r from-teal-500 to-red-500 hover:from-teal-600 hover:to-red-600 text-white font-bold">
              Start Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LearningSection({ courses, progress, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const categories = [
    { id: "all", name: "All Courses", count: courses.length },
    { id: "beginner", name: "Beginner", count: courses.filter((c) => c.difficulty === "beginner").length },
    { id: "intermediate", name: "Intermediate", count: courses.filter((c) => c.difficulty === "intermediate").length },
    { id: "advanced", name: "Advanced", count: courses.filter((c) => c.difficulty === "advanced").length },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.difficulty === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 focus:border-teal-500"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-teal-500 to-red-500 text-white hover:from-teal-600 hover:to-red-600"
                  : "border-gray-700 text-gray-300 hover:border-teal-500"
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <InteractiveCourseCard key={course.id} course={course} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

function CommunitySection() {
  const leaderboard = [
    {
      name: "Kemi Adebayo",
      points: 3420,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kemi",
      country: "🇳🇬",
    },
    {
      name: "Amara Okafor",
      points: 2847,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
      country: "🇳🇬",
    },
    {
      name: "Fatima Hassan",
      points: 2156,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      country: "🇪🇬",
    },
    {
      name: "Kofi Asante",
      points: 1923,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi",
      country: "🇬🇭",
    },
    {
      name: "Zara Mwangi",
      points: 1784,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zara",
      country: "🇰🇪",
    },
  ]

  const discussions = [
    {
      title: "Best practices for malaria prevention in rural areas",
      author: "Dr. Amina Kone",
      replies: 23,
      likes: 45,
      time: "2h ago",
      category: "Disease Prevention",
    },
    {
      title: "How to set up a community health screening program",
      author: "Samuel Ochieng",
      replies: 18,
      likes: 32,
      time: "4h ago",
      category: "Community Health",
    },
    {
      title: "Nutrition education for pregnant mothers",
      author: "Grace Mutindi",
      replies: 15,
      likes: 28,
      time: "6h ago",
      category: "Maternal Health",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-teal-500/10 border-teal-500/30">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-teal-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">12.8K</p>
            <p className="text-teal-400 text-sm">Active Members</p>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">2.4K</p>
            <p className="text-red-400 text-sm">Discussions</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Share2 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">8.9K</p>
            <p className="text-purple-400 text-sm">Shared Resources</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">54</p>
            <p className="text-yellow-400 text-sm">Countries</p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-teal-500" />
            Community Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div
                        className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-black"
                            : index === 1
                              ? "bg-gray-400 text-black"
                              : "bg-orange-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm flex items-center">
                      <span className="mr-1">{user.country}</span>
                      Rank #{index + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-teal-400 font-bold">{user.points.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">FLB earned</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Discussions */}
      <Card className="bg-black/80 border-red-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-red-500" />
            Recent Discussions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{discussion.title}</h4>
                  <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    {discussion.category}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-3">by {discussion.author}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {discussion.likes} likes
                    </span>
                  </div>
                  <span>{discussion.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RewardsSection({ progress, actions, dailyStats }) {
  const achievements = [
    { name: "First Steps", description: "Complete your first course", earned: true, rarity: "common" },
    { name: "Health Hero", description: "Complete 10 health courses", earned: true, rarity: "rare" },
    { name: "Streak Master", description: "Maintain a 7-day learning streak", earned: true, rarity: "epic" },
    { name: "Community Champion", description: "Help 5 community members", earned: false, rarity: "legendary" },
    { name: "Knowledge Seeker", description: "Complete 50 courses", earned: false, rarity: "legendary" },
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "text-gray-400 border-gray-600"
      case "rare":
        return "text-teal-400 border-teal-600"
      case "epic":
        return "text-red-400 border-red-600"
      case "legendary":
        return "text-yellow-400 border-yellow-600"
      default:
        return "text-gray-400 border-gray-600"
    }
  }

  return (
    <div className="space-y-8">
      {/* Reward Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-teal-500/20 to-red-500/20 border-teal-500/30">
          <CardContent className="p-6 text-center">
            <Coins className="h-12 w-12 text-teal-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white">{progress?.totalFLBEarned?.toLocaleString() || "0"}</p>
            <p className="text-teal-400">Total FLB Earned</p>
            <p className="text-gray-400 text-sm mt-2">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/20 to-teal-500/20 border-red-500/30">
          <CardContent className="p-6 text-center">
            <Zap className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white">{dailyStats.earned}</p>
            <p className="text-red-400">Today's Earnings</p>
            <p className="text-gray-400 text-sm mt-2">{dailyStats.remaining} FLB remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <p className="text-3xl font-bold text-white">{Math.floor((progress?.totalFLBEarned || 0) / 100)}</p>
            <p className="text-purple-400">Health Visits Funded</p>
            <p className="text-gray-400 text-sm mt-2">Your impact in action</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress */}
      <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-teal-500" />
            Daily Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Today's Earnings</span>
              <span className="text-teal-400 font-bold">{dailyStats.earned} / 500 FLB</span>
            </div>
            <Progress value={(dailyStats.earned / 500) * 100} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                <p className="text-red-400 font-bold">{dailyStats.remaining}</p>
                <p className="text-gray-400">Remaining</p>
              </div>
              <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                <p className="text-teal-400 font-bold">{((dailyStats.earned / 500) * 100).toFixed(1)}%</p>
                <p className="text-gray-400">Progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-black/80 border-red-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="mr-2 h-5 w-5 text-red-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity).replace("text-", "from-").replace(" border-", "/20 to-").replace("-400", "-500").replace("-600", "/20 border-")}`
                    : "bg-gray-900/50 border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`font-bold ${achievement.earned ? getRarityColor(achievement.rarity).split(" ")[0] : "text-gray-400"}`}
                  >
                    {achievement.name}
                  </h4>
                  {achievement.earned ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-gray-600 rounded-full" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
                <Badge variant="outline" className={`mt-2 text-xs ${getRarityColor(achievement.rarity)} capitalize`}>
                  {achievement.rarity}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Rewards */}
      <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-teal-500" />
            Recent Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actions.slice(0, 5).map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-500/20 rounded-full">
                    <Coins className="h-4 w-4 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{action.description}</p>
                    <p className="text-gray-400 text-xs">{new Date(action.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">+{action.flbAmount} FLB</Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FeaturedCourseCard({ course, index }) {
  const getCourseEmoji = (name: string) => {
    if (name.toLowerCase().includes("malaria")) return "🦟"
    if (name.toLowerCase().includes("maternal")) return "🤱"
    if (name.toLowerCase().includes("nutrition")) return "🥗"
    if (name.toLowerCase().includes("community")) return "👥"
    if (name.toLowerCase().includes("health")) return "🏥"
    return "📚"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 hover:border-teal-500/50 transition-all duration-300 overflow-hidden">
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{course.rewardAmount} FLB</Badge>
          </div>
          <div className="p-6 pb-4">
            <div className="text-4xl mb-4">{getCourseEmoji(course.name)}</div>
            <CardTitle className="text-white text-lg mb-2">{course.name}</CardTitle>
            <CardDescription className="text-gray-400 text-sm mb-4">{course.description}</CardDescription>
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {course.duration} min
              </span>
              <span className="capitalize">{course.difficulty}</span>
            </div>
          </div>
        </div>
        <CardContent className="pt-0">
          <Button className="w-full bg-gradient-to-r from-teal-500 to-red-500 hover:from-teal-600 hover:to-red-600 text-white font-bold">
            <Play className="mr-2 h-4 w-4" />
            Start Learning
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function InteractiveCourseCard({ course, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const getCourseEmoji = (name: string) => {
    if (name.toLowerCase().includes("malaria")) return "🦟"
    if (name.toLowerCase().includes("maternal")) return "🤱"
    if (name.toLowerCase().includes("nutrition")) return "🥗"
    if (name.toLowerCase().includes("community")) return "👥"
    if (name.toLowerCase().includes("health")) return "🏥"
    return "📚"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "intermediate":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "advanced":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card className="bg-gray-900/50 border-gray-800 hover:border-teal-500/50 transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsBookmarked(!isBookmarked)
              }}
              className={`p-2 rounded-full backdrop-blur-md ${
                isBookmarked ? "bg-teal-500 text-white" : "bg-black/50 text-white"
              }`}
            >
              <Star className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between mb-2">
              <div className="text-4xl">{getCourseEmoji(course.name)}</div>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{course.rewardAmount} FLB</Badge>
            </div>
            <CardTitle className="text-white text-lg group-hover:text-teal-300 transition-colors">
              {course.name}
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">{course.description}</CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {course.duration} min
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {Math.floor(Math.random() * 1000) + 100}
              </span>
            </div>
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </Badge>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-1" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-gradient-to-r from-teal-500 to-red-500 hover:from-teal-600 hover:to-red-600 text-white font-bold group-hover:scale-105 transition-transform">
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:border-teal-500 bg-transparent"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ImpactStatCard({ icon, value, label, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="bg-black/60 border-gray-800 backdrop-blur-md text-center p-6 hover:border-teal-500/50 transition-all">
        <div className="mb-4">{icon}</div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="text-teal-400 font-medium mb-1">{label}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </Card>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description, color, border }) {
  return (
    <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className="cursor-pointer">
      <Card className={`bg-gradient-to-br ${color} ${border} backdrop-blur-md h-full`}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
