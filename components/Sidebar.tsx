"use client"

import type React from "react"
import { Info, LogOut, MessageCircle, Plus, Upload, ChevronDown, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarItemProps = {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  isActive?: boolean
  alignRight?: boolean
}

const SidebarItem = ({ icon, label, onClick, isActive = false, alignRight = false }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full py-3 px-4 text-sm transition-colors",
        isActive ? "text-white" : "text-gray-400 hover:text-white",
      )}
    >
      <span>{label}</span>
      {alignRight && <div className="ml-auto">{icon}</div>}
      {!alignRight && icon}
    </button>
  )
}

type SidebarProps = {
  flbBalance?: number
}

const Sidebar = ({ flbBalance = 0 }: SidebarProps) => {
  return (
    <div className="w-[170px] h-screen bg-black border-r border-gray-800 flex flex-col justify-between">
      <div className="flex flex-col">
        {/* FlameBorn Logo */}
        <div className="p-4 mb-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-md flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-sm">FlameBorn</span>
        </div>

        {/* Health Network Status */}
        <div className="mx-4 mb-2">
          <button className="flex items-center justify-between bg-zinc-900 rounded-md px-3 py-2 w-full text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Health Network</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mx-4 my-2"></div>

        {/* Add Health Actor */}
        <div className="px-4">
          <SidebarItem label="Verify Health Actor" icon={<Plus className="w-4 h-4" />} alignRight={true} />
        </div>
      </div>

      <div className="mt-auto">
        {/* FLB Balance */}
        <div className="flex items-center justify-between px-4 py-3 text-gray-400 text-sm border-t border-gray-800">
          <span>FLB Balance: {flbBalance}</span>
          <Info className="w-4 h-4" />
        </div>

        {/* Bottom menu items */}
        <SidebarItem label="Connect Wallet" icon={<Upload className="w-4 h-4" />} alignRight={true} />

        <SidebarItem label="Health Reports" icon={<MessageCircle className="w-4 h-4" />} alignRight={true} />

        <SidebarItem label="Log out" icon={<LogOut className="w-4 h-4" />} alignRight={true} />

        {/* Version number */}
        <div className="text-gray-500 text-[10px] text-center py-2">FlameBorn v1.0</div>
      </div>
    </div>
  )
}

export default Sidebar
