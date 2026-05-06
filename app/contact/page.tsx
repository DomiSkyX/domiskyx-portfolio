'use client'

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"

export default function Contact() {
  const createMessage = useMutation(api.messages.create)

  const [form, setForm] = useState({
    email: "",
    message: "",
  })

  const [sent, setSent] = useState(false)

  const sendMessage = async () => {
    await createMessage({
      email: form.email,
      message: form.message,
    })

    setForm({ email: "", message: "" })
    setSent(true)

    setTimeout(() => {
      setSent(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen py-24">
      <Container>

        <h1 className="text-3xl font-semibold mb-8">
          Contact
        </h1>

        <div className="space-y-4 max-w-xl">

          <input
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            placeholder="Message"
            className="w-full border p-3 rounded min-h-[140px]"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            onClick={sendMessage}
            className="w-full bg-black text-white py-3 rounded"
          >
            Send Message
          </button>

          {sent && (
            <div className="text-sm text-green-600">
              Message sent successfully ✔
            </div>
          )}

        </div>

      </Container>
    </main>
  )
}