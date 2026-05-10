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
    <header className="w-full border-b backdrop-blur bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <Link href="/" className="hover:opacity-60 transition">
            Home
          </Link>

          <Link href="/projects" className="hover:opacity-60 transition">
            Projects
          </Link>

          <Link href="/about" className="hover:opacity-60 transition">
            About
          </Link>

          <Link href="/contact" className="hover:opacity-60 transition">
            Contact
          </Link>

          {admin && (
            <Link
              href="/admin"
              className="text-red-500 hover:opacity-70 transition"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden sm:block">
            Dark Mode
          </span>

          <ThemeToggle />

          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link
              href="/sign-in"
              className="hover:opacity-60 transition"
            >
              Sign in
            </Link>
          )}
        </div>

      </div>
    </header>
  )
}