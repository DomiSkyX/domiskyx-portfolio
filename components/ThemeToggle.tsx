'use client'

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark")

    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }

    setDark(!isDark)
  }

  return (
    <button
      onClick={toggle}
      className="relative w-11 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full transition"
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition ${
          dark ? "translate-x-5" : ""
        }`}
      />
    </button>
  )
}