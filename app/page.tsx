"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MainScene } from "@/components/main-scene"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-orange-500 animate-spin mb-4"></div>
          <h1 className="text-2xl font-bold text-white">
            Loading FlameBorn<span className="animate-pulse">...</span>
          </h1>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-10">
            <MainScene />
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
            <div className="max-w-4xl text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                <span className="text-orange-500">Flame</span>Born
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">Sovereign African Health Currency</p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Eliminating disease outbreaks in Africa through blockchain-powered transparency. Every donation directly
                supports verified health facilities and earns you FLB governance tokens.
              </p>
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-8 backdrop-blur-sm">
                <p className="text-orange-400 font-medium text-lg">"Life is Simple. Only Decide."</p>
                <p className="text-orange-300 text-sm mt-1">Kairo Covenant v1.0</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-6 text-lg"
                  onClick={() => router.push("/login")}
                >
                  Join the Movement
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-900/20 px-8 py-6 text-lg bg-transparent"
                  onClick={() => router.push("/governance")}
                >
                  Explore Governance
                </Button>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-white">
              <Button
                variant="link"
                className="text-white hover:text-orange-400 pointer-events-auto"
                onClick={() => router.push("/login")}
              >
                Verify Identity
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-orange-400 pointer-events-auto"
                onClick={() => router.push("/health-impact")}
              >
                Health Impact
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-orange-400 pointer-events-auto"
                onClick={() => router.push("/impact-tracking")}
              >
                Track Impact
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-orange-400 pointer-events-auto"
                onClick={() => router.push("/governance")}
              >
                Governance
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-orange-400 pointer-events-auto"
                onClick={() => router.push("/community")}
              >
                Community
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-orange-400 pointer-events-auto"
                onClick={() => router.push("/donation-studio")}
              >
                Donate
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
