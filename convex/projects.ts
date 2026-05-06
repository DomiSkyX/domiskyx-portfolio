import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.string(),
    slug: v.string(),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("projects", args)
  },
})

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect()
  },
})

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first()
  },
})