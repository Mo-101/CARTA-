"use client"

import { useState } from "react"

interface Course {
  id: string
  name: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  rewardAmount: number
  completed: boolean
  progress: number
}

interface Progress {
  currentStreak: number
  coursesCompleted: number
  totalFLBEarned: number
  badges: string[]
}

interface Action {
  id: string
  description: string
  flbAmount: number
  timestamp: string
}

interface DailyStats {
  earned: number
  remaining: number
}

export function useYouthRewards() {
  const [progress, setProgress] = useState<Progress>({
    currentStreak: 7,
    coursesCompleted: 3,
    totalFLBEarned: 450,
    badges: ["First Steps", "Health Hero", "Streak Master"],
  })

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "Malaria Prevention Basics",
      description: "Learn essential malaria prevention techniques for African communities",
      difficulty: "beginner",
      duration: 45,
      rewardAmount: 50,
      completed: true,
      progress: 100,
    },
    {
      id: "2",
      name: "Maternal Health Care",
      description: "Comprehensive guide to maternal health in rural settings",
      difficulty: "intermediate",
      duration: 90,
      rewardAmount: 100,
      completed: false,
      progress: 60,
    },
    {
      id: "3",
      name: "Community Health Leadership",
      description: "Advanced strategies for leading health initiatives",
      difficulty: "advanced",
      duration: 120,
      rewardAmount: 150,
      completed: false,
      progress: 0,
    },
    {
      id: "4",
      name: "Nutrition Education",
      description: "Teaching proper nutrition in African communities",
      difficulty: "beginner",
      duration: 60,
      rewardAmount: 75,
      completed: true,
      progress: 100,
    },
    {
      id: "5",
      name: "Mental Health Awareness",
      description: "Understanding and addressing mental health challenges",
      difficulty: "intermediate",
      duration: 75,
      rewardAmount: 85,
      completed: false,
      progress: 25,
    },
  ])

  const [actions, setActions] = useState<Action[]>([
    {
      id: "1",
      description: "Completed Malaria Prevention course",
      flbAmount: 50,
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      description: "7-day learning streak achieved",
      flbAmount: 25,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      description: "Completed Nutrition Education course",
      flbAmount: 75,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "4",
      description: "First course completion bonus",
      flbAmount: 100,
      timestamp: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "5",
      description: "Profile setup completed",
      flbAmount: 20,
      timestamp: new Date(Date.now() - 345600000).toISOString(),
    },
  ])

  const [loading, setLoading] = useState(false)

  const getDailyStats = (): DailyStats => {
    const earned = 150 // Mock daily earnings
    const remaining = 350 // Mock remaining daily limit
    return { earned, remaining }
  }

  const completeCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseId ? { ...course, completed: true, progress: 100 } : course)),
    )

    const course = courses.find((c) => c.id === courseId)
    if (course) {
      setProgress((prev) => ({
        ...prev,
        coursesCompleted: prev.coursesCompleted + 1,
        totalFLBEarned: prev.totalFLBEarned + course.rewardAmount,
      }))

      setActions((prev) => [
        {
          id: Date.now().toString(),
          description: `Completed ${course.name}`,
          flbAmount: course.rewardAmount,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ])
    }
  }

  const updateCourseProgress = (courseId: string, newProgress: number) => {
    setCourses((prev) => prev.map((course) => (course.id === courseId ? { ...course, progress: newProgress } : course)))
  }

  return {
    progress,
    courses,
    actions,
    loading,
    getDailyStats,
    completeCourse,
    updateCourseProgress,
  }
}
