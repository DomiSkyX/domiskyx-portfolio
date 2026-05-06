'use client'

import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { isAdmin } from "@/lib/admin"
import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  const { user, isSignedIn } = useUser()

  const email = user?.emailAddresses?.[0]?.emailAddress ?? ""
  const admin = isAdmin(email)

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* NAV */}
        <nav className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {admin && (
            <Link
              href="/admin"
              className="text-red-500 hover:text-red-600 transition"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 text-sm">

          <span className="text-neutral-400">Theme</span>
          <ThemeToggle />

          <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800" />

          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link
              href="/sign-in"
              className="px-3 py-1 rounded-full border "
            >
              Sign in
            </Link>
          )}

        </div>

      </div>
    </header>
  )
}