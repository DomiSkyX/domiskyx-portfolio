'use client'

import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"
import { useUser } from "@clerk/nextjs"
import { isAdmin } from "@/lib/admin"

export default function Admin() {
  const { user, isLoaded } = useUser()

  const email = user?.emailAddresses?.[0]?.emailAddress
  const admin = isAdmin(email)

  const createProject = useMutation(api.projects.create)
  const messages = useQuery(api.messages.getAll)
  const updateStatus = useMutation(api.messages.updateStatus)

  const [tab, setTab] = useState<"projects" | "messages">("projects")
  const [filter, setFilter] = useState<"New" | "Read" | "Saved">("New")

  const [dragActive, setDragActive] = useState(false)

  const [form, setForm] = useState<{
    title: string
    description: string
    content: string
    slug: string
    images: string[]
  }>({
    title: "",
    description: "",
    content: "",
    slug: "",
    images: [],
  })

  if (!isLoaded) return null
  if (!admin) return null

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-")

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    Array.from(e.dataTransfer.files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result
        if (typeof result === "string") {
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }))
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => setDragActive(false)

  return (
    <main className="min-h-screen py-24 bg-background text-foreground">
      <Container>

        {/* HEADER TABS */}
        <div className="flex gap-2 mb-10 text-sm">
          {["projects", "messages"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 py-2 rounded-full border transition tracking-tight ${
                tab === t
                  ? "bg-zinc-900 text-white border-transparent dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-transparent text-zinc-700 dark:text-zinc-300 hover:opacity-60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* PROJECTS */}
        {tab === "projects" && (
          <div className="space-y-4 max-w-xl">

            {["title", "description", "content", "slug"].map((key) => (
              <input
                key={key}
                className="w-full border border-border p-3 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                placeholder={key}
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: e.target.value,
                    slug:
                      key === "title"
                        ? generateSlug(e.target.value)
                        : form.slug,
                  })
                }
              />
            ))}

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed p-6 rounded-xl transition ${
                dragActive
                  ? "bg-black/5 border-black"
                  : "border-border"
              }`}
            >
              <p className="text-sm text-neutral-500">
                Drag images here or click to upload
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {form.images.map((img, i) => (
                <div
                  key={i}
                  className="relative group rounded-lg overflow-hidden border"
                >
                  <img
                    src={img}
                    className="h-20 w-full object-cover group-hover:scale-105 transition"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => createProject(form)}
              className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
            >
              Create Project
            </button>
          </div>
        )}

        {/* MESSAGES */}
        {tab === "messages" && (
          <div className="space-y-6 max-w-2xl">

            <div className="flex gap-2 text-sm">
              {(["New", "Read", "Saved"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 rounded-full border transition tracking-tight ${
                    filter === t
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent"
                      : "bg-transparent text-zinc-700 dark:text-zinc-300 hover:opacity-60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {messages
                ?.filter((m: any) => m.status === filter)
                .map((m: any) => (
                  <div
                    key={m._id}
                    className="border border-border rounded-xl p-4 hover:shadow-sm transition"
                  >
                    <p className="text-xs text-neutral-400">
                      {m.email}
                    </p>

                    <p className="mt-1 text-sm">
                      {m.message}
                    </p>

                    <div className="flex gap-3 text-xs mt-3">
                      <button
                        onClick={() =>
                          updateStatus({
                            id: m._id,
                            status: "Read",
                          })
                        }
                        className="hover:underline"
                      >
                        Read
                      </button>

                      <button
                        onClick={() =>
                          updateStatus({
                            id: m._id,
                            status: "Saved",
                          })
                        }
                        className="hover:underline"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </Container>
    </main>
  )
}