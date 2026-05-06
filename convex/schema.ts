import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.string(),
    slug: v.string(),
    images: v.array(v.string()),
  }),

  messages: defineTable({
    email: v.string(),
    message: v.string(),
    status: v.string(), // "new" | "read" | "saved"
    createdAt: v.number(),
  }),
})