"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
} from "lucide-react"

interface VideoContent {
  id: string
  title: string
  description: string
  duration: number
  videoUrl: string
  thumbnailUrl: string
  transcriptUrl?: string
  quizzes: Quiz[]
  resources: Resource[]
}

interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  timeStamp: number // When in video to show quiz
}

interface Resource {
  id: string
  title: string
  type: "pdf" | "link" | "document"
  url: string
}

interface VideoPlayerProps {
  content: VideoContent
  onProgress: (progress: number) => void
  onQuizComplete: (quizId: string, correct: boolean) => void
  onVideoComplete: () => void
}

export function VideoPlayer({ content, onProgress, onQuizComplete, onVideoComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showQuiz, setShowQuiz] = useState<Quiz | null>(null)
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set())
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      onProgress((video.currentTime / video.duration) * 100)

      // Check for quizzes at current timestamp
      const currentQuiz = content.quizzes.find(
        (quiz) => Math.abs(quiz.timeStamp - video.currentTime) < 1 && !completedQuizzes.has(quiz.id),
      )

      if (currentQuiz && !showQuiz) {
        video.pause()
        setIsPlaying(false)
        setShowQuiz(currentQuiz)
      }
    }

    const updateDuration = () => setDuration(video.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      onVideoComplete()
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", handleEnded)
    }
  }, [content.quizzes, showQuiz, completedQuizzes, onProgress, onVideoComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = time
    setCurrentTime(time)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const changeVolume = (newVolume: number) => {
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const handleQuizAnswer = (answerIndex: number) => {
    if (!showQuiz) return

    const isCorrect = answerIndex === showQuiz.correctAnswer
    onQuizComplete(showQuiz.id, isCorrect)

    setCompletedQuizzes((prev) => new Set([...prev, showQuiz.id]))
    setShowQuiz(null)

    // Resume video after quiz
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }, 2000)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <Card className="bg-black border-orange-500/30 overflow-hidden">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={content.videoUrl}
            poster={content.thumbnailUrl}
            preload="metadata"
          />

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div
                  className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const clickX = e.clientX - rect.left
                    const newTime = (clickX / rect.width) * duration
                    handleSeek(newTime)
                  }}
                >
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => changeVolume(Number.parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={playbackRate}
                    onChange={(e) => changePlaybackRate(Number.parseFloat(e.target.value))}
                    className="bg-black/50 text-white text-sm rounded px-2 py-1"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Settings className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quiz Overlay */}
      {showQuiz && (
        <Card className="bg-black/95 border-orange-500 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="mr-2 h-5 w-5 text-orange-500" />
              Knowledge Check
            </CardTitle>
            <CardDescription className="text-gray-400">Answer correctly to earn bonus FLB tokens!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-white font-medium">{showQuiz.question}</h3>
              <div className="grid grid-cols-1 gap-2">
                {showQuiz.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto p-3 border-gray-600 hover:border-orange-500 hover:bg-orange-500/10 bg-transparent"
                    onClick={() => handleQuizAnswer(index)}
                  >
                    <span className="text-orange-500 font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-white">{option}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Information */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-black/80 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-white">{content.title}</CardTitle>
              <CardDescription className="text-gray-400">{content.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {Math.floor(content.duration / 60)} minutes
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-1 h-4 w-4" />
                  {content.quizzes.length} quizzes
                </div>
                <div className="flex items-center">
                  <Award className="mr-1 h-4 w-4" />
                  Up to 100 FLB rewards
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card className="bg-black/80 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-white">Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {content.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{resource.title}</h4>
                      <Badge variant="outline" className="mt-1">
                        {resource.type.toUpperCase()}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(resource.url, "_blank")}
                      className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
                    >
                      Open
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card className="bg-black/80 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-white">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Video Progress</span>
                    <span className="text-white">{Math.round((currentTime / duration) * 100)}%</span>
                  </div>
                  <Progress value={(currentTime / duration) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Quizzes Completed</span>
                    <span className="text-white">
                      {completedQuizzes.size}/{content.quizzes.length}
                    </span>
                  </div>
                  <Progress value={(completedQuizzes.size / content.quizzes.length) * 100} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center space-x-2 p-2 bg-gray-900/50 rounded">
                      {completedQuizzes.has(quiz.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-600" />
                      )}
                      <span className="text-sm text-gray-300">Quiz at {formatTime(quiz.timeStamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock video content for demonstration
export const mockVideoContent: VideoContent = {
  id: "malaria-prevention-101",
  title: "Malaria Prevention Fundamentals",
  description:
    "Learn essential malaria prevention techniques for African communities, including ITN distribution, community education, and early detection methods.",
  duration: 1800, // 30 minutes
  videoUrl: "/placeholder-video.mp4", // Would be replaced with actual video URL
  thumbnailUrl: "/placeholder.svg?height=400&width=600",
  quizzes: [
    {
      id: "quiz-1",
      question: "What is the most effective method for preventing malaria transmission?",
      options: [
        "Taking antimalarial drugs daily",
        "Using insecticide-treated nets (ITNs)",
        "Avoiding outdoor activities",
        "Drinking boiled water",
      ],
      correctAnswer: 1,
      explanation:
        "ITNs are the most cost-effective method for preventing malaria transmission by creating a physical and chemical barrier against mosquitoes.",
      timeStamp: 300, // 5 minutes
    },
    {
      id: "quiz-2",
      question: "When should ITNs be replaced?",
      options: ["Every month", "Every 6 months", "Every 2-3 years or when damaged", "Never, they last forever"],
      correctAnswer: 2,
      explanation:
        "ITNs should be replaced every 2-3 years or when they become torn or damaged, as the insecticide effectiveness decreases over time.",
      timeStamp: 900, // 15 minutes
    },
  ],
  resources: [
    {
      id: "resource-1",
      title: "WHO Malaria Prevention Guidelines",
      type: "pdf",
      url: "/resources/who-malaria-guidelines.pdf",
    },
    {
      id: "resource-2",
      title: "ITN Distribution Best Practices",
      type: "document",
      url: "/resources/itn-distribution-guide.pdf",
    },
    {
      id: "resource-3",
      title: "Community Health Worker Training Materials",
      type: "link",
      url: "https://example.com/chw-training",
    },
  ],
}
