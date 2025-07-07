"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getHealthAdvice, getMockHealthAdvice } from "@/lib/health-ai"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function HealthAiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError("")
    try {
      const advice = await getHealthAdvice(prompt)

      // Check if the response indicates a missing API key
      if (advice.includes("API key")) {
        setError("OpenAI API key is missing. Using mock responses instead.")
        // Use mock advice as fallback
        const mockAdvice = await getMockHealthAdvice(prompt)
        setResponse(mockAdvice)
      } else {
        setResponse(advice)
      }
    } catch (error) {
      console.error("Error getting health advice:", error)
      setError("Error connecting to AI service. Using mock responses instead.")
      // Use mock advice as fallback
      const mockAdvice = await getMockHealthAdvice(prompt)
      setResponse(mockAdvice)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-24 right-6 z-50 rounded-full w-12 h-12 p-0 bg-orange-500 hover:bg-orange-600 text-black shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Heart size={24} />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-black/90 border-orange-500/30 backdrop-blur-md shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white flex items-center">
              <Heart className="mr-2 h-5 w-5 text-orange-500" />
              Health Impact Advisor
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 bg-yellow-900/20 border-yellow-800 text-yellow-400">
                <AlertTitle>API Key Missing</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Ask about health initiatives, donation impact, or African health challenges..."
                className="bg-gray-900/50 border-gray-700 text-white resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? "Thinking..." : "Get Health Advice"}
                {!isLoading && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            {response && (
              <div className="mt-4 p-3 bg-gray-900/50 rounded-md text-white text-sm max-h-60 overflow-y-auto">
                {response}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
