"use client"

import { DevelopmentActionPlan } from "@/components/development-action-plan"
import { Navigation } from "@/components/navigation"

export default function ActionPlanPage() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <Navigation />
      <div className="pt-20 pb-8 px-4">
        <DevelopmentActionPlan />
      </div>
    </main>
  )
}
