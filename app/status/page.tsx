"use client"

import { Navigation } from "@/components/navigation"
import { SystemStatusDashboard } from "@/components/system-status-dashboard"

export default function StatusPage() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      <Navigation />

      <div className="pt-20 pb-8 px-4 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-orange-500">System</span> Status
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time overview of FlameBorn platform components, metrics, and development progress
          </p>
        </div>

        <SystemStatusDashboard />
      </div>
    </main>
  )
}
