
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "linkedin-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)

    // Apply LinkedIn-inspired theme colors  
    if (theme === "dark") {
      root.style.setProperty("--background", "0 0% 0%") // Pure black
      root.style.setProperty("--foreground", "0 0% 98%")
      root.style.setProperty("--card", "0 0% 0%")
      root.style.setProperty("--card-foreground", "0 0% 98%")
      root.style.setProperty("--popover", "240 10% 3.9%")
      root.style.setProperty("--popover-foreground", "0 0% 98%")
      root.style.setProperty("--primary", "203 89% 35%") // LinkedIn blue
      root.style.setProperty("--primary-foreground", "0 0% 98%")
      root.style.setProperty("--secondary", "240 3.7% 15.9%")
      root.style.setProperty("--secondary-foreground", "0 0% 98%")
      root.style.setProperty("--muted", "240 3.7% 15.9%")
      root.style.setProperty("--muted-foreground", "240 5% 64.9%")
      root.style.setProperty("--accent", "240 3.7% 15.9%")
      root.style.setProperty("--accent-foreground", "0 0% 98%")
      root.style.setProperty("--destructive", "0 62.8% 30.6%")
      root.style.setProperty("--destructive-foreground", "0 0% 98%")
      root.style.setProperty("--border", "240 3.7% 15.9%")
      root.style.setProperty("--input", "240 3.7% 15.9%")
      root.style.setProperty("--ring", "203 89% 35%") // LinkedIn blue for focus rings
    } else {
      // Light theme fallback (though your app is primarily dark)
      root.style.setProperty("--background", "0 0% 100%")
      root.style.setProperty("--foreground", "240 10% 3.9%")
      root.style.setProperty("--card", "0 0% 100%")
      root.style.setProperty("--card-foreground", "240 10% 3.9%")
      root.style.setProperty("--popover", "0 0% 100%")
      root.style.setProperty("--popover-foreground", "240 10% 3.9%")
      root.style.setProperty("--primary", "203 89% 35%") // LinkedIn blue
      root.style.setProperty("--primary-foreground", "0 0% 98%")
      root.style.setProperty("--secondary", "240 4.8% 95.9%")
      root.style.setProperty("--secondary-foreground", "240 5.9% 10%")
      root.style.setProperty("--muted", "240 4.8% 95.9%")
      root.style.setProperty("--muted-foreground", "240 3.8% 46.1%")
      root.style.setProperty("--accent", "240 4.8% 95.9%")
      root.style.setProperty("--accent-foreground", "240 5.9% 10%")
      root.style.setProperty("--destructive", "0 84.2% 60.2%")
      root.style.setProperty("--destructive-foreground", "0 0% 98%")
      root.style.setProperty("--border", "240 5.9% 90%")
      root.style.setProperty("--input", "240 5.9% 90%")
      root.style.setProperty("--ring", "203 89% 35%") // LinkedIn blue for focus rings
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
