// convex/messages.ts

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      email: args.email,
      message: args.message,
      status: "New",
      createdAt: Date.now(),
    })
  },
})

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect()
  },
})

export const updateStatus = mutation({
  args: {
    id: v.id("messages"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    })
  },
})