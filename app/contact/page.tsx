'use client'

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"

export default function ContactPage() {
  const sendMessage = useMutation(api.messages.create)

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const submit = async () => {
    if (!email || !message) return

    await sendMessage({
      email,
      message,
    })

    setEmail("")
    setMessage("")
  }

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <Container>

        <div className="max-w-2xl mx-auto space-y-8">

          <div className="space-y-3">

            <p className="text-sm text-muted-foreground">
              Contact
            </p>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Let’s work together.
            </h1>

          </div>

          <div className="space-y-5">

            <input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <button
              onClick={submit}
              className="w-full rounded-2xl bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Send message
            </button>

          </div>

        </div>

      </Container>
    </main>
  )
}