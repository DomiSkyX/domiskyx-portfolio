'use client'

import { useEffect, useState } from "react"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("theme")

    if (stored === "dark") {
      document.documentElement.classList.add("dark")
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      // system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        document.documentElement.classList.add("dark")
      }
    }

    setMounted(true)
  }, [])

  if (!mounted) return null

  return <>{children}</>
}