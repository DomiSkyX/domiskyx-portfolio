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

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    slug: "",
    images: [] as string[],
  })

  if (!isLoaded || !admin) return null

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

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <Container>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-10 text-sm">
          {["projects", "messages"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 py-2 rounded-full border transition ${
                tab === t
                  ? "bg-foreground text-background"
                  : "hover:opacity-60"
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
                className="w-full rounded-xl border p-3 bg-background"
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
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={() => setDragActive(false)}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
                dragActive ? "border-foreground bg-muted" : ""
              }`}
            >
              Drag images here
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {form.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="aspect-video object-cover rounded-lg"
                />
              ))}
            </div>

            <button
              onClick={() => createProject(form)}
              className="w-full bg-foreground text-background py-3 rounded-xl"
            >
              Create Project
            </button>

          </div>
        )}

        {/* MESSAGES */}
        {tab === "messages" && (
          <div className="space-y-6 max-w-2xl">

            <div className="flex flex-wrap gap-2 text-sm">
              {(["New", "Read", "Saved"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 rounded-full border ${
                    filter === t
                      ? "bg-foreground text-background"
                      : "hover:opacity-60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {messages
              ?.filter((m: any) => m.status === filter)
              .map((m: any) => (
                <div
                  key={m._id}
                  className="border rounded-xl p-4 space-y-2"
                >
                  <p className="text-xs opacity-60">{m.email}</p>
                  <p className="text-sm">{m.message}</p>

                  <div className="flex gap-4 text-xs">
                    <button
                      onClick={() =>
                        updateStatus({ id: m._id, status: "Read" })
                      }
                    >
                      Read
                    </button>

                    <button
                      onClick={() =>
                        updateStatus({ id: m._id, status: "Saved" })
                      }
                    >
                      Save
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

      </Container>
    </main>
  )
}