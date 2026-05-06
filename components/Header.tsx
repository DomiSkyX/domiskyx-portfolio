'use client'

import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { isAdmin } from "@/lib/admin"
import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  const { user, isSignedIn } = useUser()

  const email = user?.emailAddresses?.[0]?.emailAddress
  const admin = isAdmin(email)

  return (
    <header className="w-full border-b">
      <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">

        <nav className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {admin && (
            <Link href="/admin" className="text-red-500">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">

          Dark Mode
          <ThemeToggle />

          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="text-sm">
              Sign in
            </Link>
          )}

        </div>

      </div>
    </header>
  )
}