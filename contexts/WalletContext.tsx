"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  name: string
  avatar?: string
  level: number
  flbBalance: number
}

interface WalletContextType {
  user: User | null
  isConnected: boolean
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const connect = () => {
    // Mock wallet connection
    const mockUser: User = {
      name: "Amara",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
      level: 5,
      flbBalance: 1250,
    }
    setUser(mockUser)
    setIsConnected(true)
  }

  const disconnect = () => {
    setUser(null)
    setIsConnected(false)
  }

  return <WalletContext.Provider value={{ user, isConnected, connect, disconnect }}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
