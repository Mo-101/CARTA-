"use server"

export interface YouthAction {
  id: string
  userId: string
  actionType: string
  flbAmount: number
  timestamp: Date
  verifiedBy?: string
  courseId?: string
  description?: string
}

export interface Course {
  id: string
  name: string
  description: string
  rewardAmount: number
  active: boolean
  contentHash?: string
  language: string
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface YouthProgress {
  userId: string
  totalFLBEarned: number
  coursesCompleted: number
  currentStreak: number
  lastActivityDate: Date
  level: number
  badges: string[]
}

// Mock data for preview
const mockCourses: Course[] = [
  {
    id: "course_1",
    name: "African Health Systems",
    description: "Understanding healthcare delivery across Africa",
    rewardAmount: 75,
    active: true,
    language: "en",
    duration: 45,
    difficulty: "intermediate",
  },
  {
    id: "course_2",
    name: "Community Health Workers",
    description: "Training for frontline health advocates",
    rewardAmount: 100,
    active: true,
    language: "en",
    duration: 60,
    difficulty: "advanced",
  },
  {
    id: "course_3",
    name: "Malaria Prevention",
    description: "Evidence-based prevention strategies",
    rewardAmount: 50,
    active: true,
    language: "en",
    duration: 30,
    difficulty: "beginner",
  },
  {
    id: "course_4",
    name: "Maternal Health Care",
    description: "Essential care for mothers and newborns",
    rewardAmount: 85,
    active: true,
    language: "en",
    duration: 40,
    difficulty: "intermediate",
  },
  {
    id: "course_5",
    name: "Nutrition and Food Security",
    description: "Addressing malnutrition in African communities",
    rewardAmount: 65,
    active: true,
    language: "en",
    duration: 35,
    difficulty: "beginner",
  },
]

const mockActions: YouthAction[] = [
  {
    id: "action_1",
    userId: "user_12345678",
    actionType: "COURSE_COMPLETION",
    flbAmount: 50,
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    courseId: "course_3",
    description: "Completed course: Malaria Prevention",
  },
  {
    id: "action_2",
    userId: "user_12345678",
    actionType: "PEER_REVIEW",
    flbAmount: 25,
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    description: "Reviewed peer submission on nutrition",
  },
]

const mockProgress: YouthProgress = {
  userId: "user_12345678",
  totalFLBEarned: 1247,
  coursesCompleted: 23,
  currentStreak: 12,
  lastActivityDate: new Date(),
  level: 7,
  badges: ["Health Hero", "Streak Master", "Community Champion"],
}

// Course Management
export async function createCourse(courseData: Omit<Course, "id">): Promise<Course> {
  try {
    const course: Course = {
      id: `course_${Date.now()}`,
      ...courseData,
    }
    return course
  } catch (error) {
    console.error("Error creating course:", error)
    throw new Error("Failed to create course")
  }
}

export async function getCourses(language?: string, difficulty?: string): Promise<Course[]> {
  try {
    let courses = [...mockCourses]

    if (language) {
      courses = courses.filter((course) => course.language === language)
    }
    if (difficulty) {
      courses = courses.filter((course) => course.difficulty === difficulty)
    }

    return courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    throw new Error("Failed to fetch courses")
  }
}

export async function getCourse(courseId: string): Promise<Course | null> {
  try {
    const course = mockCourses.find((c) => c.id === courseId)
    return course || null
  } catch (error) {
    console.error("Error fetching course:", error)
    throw new Error("Failed to fetch course")
  }
}

// Youth Action Management
export async function recordYouthAction(actionData: Omit<YouthAction, "id" | "timestamp">): Promise<YouthAction> {
  try {
    // Check daily earning cap (mock implementation)
    const dailyCap = 500 // 500 FLB per day

    if (actionData.flbAmount > dailyCap) {
      throw new Error("Daily earning cap exceeded")
    }

    const action: YouthAction = {
      id: `action_${Date.now()}`,
      timestamp: new Date(),
      ...actionData,
    }

    return action
  } catch (error) {
    console.error("Error recording youth action:", error)
    throw new Error("Failed to record youth action")
  }
}

export async function getYouthActions(userId: string, limit = 50): Promise<YouthAction[]> {
  try {
    const actions = mockActions.filter((action) => action.userId === userId).slice(0, limit)
    return actions
  } catch (error) {
    console.error("Error fetching youth actions:", error)
    throw new Error("Failed to fetch youth actions")
  }
}

// Progress Management
export async function getYouthProgress(userId: string): Promise<YouthProgress | null> {
  try {
    if (userId === mockProgress.userId) {
      return mockProgress
    }
    return null
  } catch (error) {
    console.error("Error fetching youth progress:", error)
    throw new Error("Failed to fetch progress")
  }
}

export async function getLeaderboard(limit = 20): Promise<YouthProgress[]> {
  try {
    // Mock leaderboard data
    const leaderboard = Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
      userId: `user_${i + 1}`,
      totalFLBEarned: 2000 - i * 100,
      coursesCompleted: 30 - i * 2,
      currentStreak: 15 - i,
      lastActivityDate: new Date(),
      level: 10 - i,
      badges: ["Health Hero", "Streak Master"],
    }))

    return leaderboard
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    throw new Error("Failed to fetch leaderboard")
  }
}

// Course Completion
export async function completeCourse(userId: string, courseId: string): Promise<YouthAction> {
  try {
    // Get course details
    const course = await getCourse(courseId)
    if (!course) {
      throw new Error("Course not found")
    }

    // Record completion
    const action = await recordYouthAction({
      userId,
      actionType: "COURSE_COMPLETION",
      flbAmount: course.rewardAmount,
      courseId,
      description: `Completed course: ${course.name}`,
    })

    return action
  } catch (error) {
    console.error("Error completing course:", error)
    throw new Error("Failed to complete course")
  }
}

// Analytics
export async function getEcosystemStats() {
  try {
    return {
      totalUsers: 12847,
      totalFLBDistributed: 2400000,
      totalCourses: 847,
      activeLearners: 8934,
    }
  } catch (error) {
    console.error("Error fetching ecosystem stats:", error)
    throw new Error("Failed to fetch stats")
  }
}
