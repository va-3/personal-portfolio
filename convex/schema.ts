import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    submittedAt: v.number(),
    status: v.string(), // "new", "read", "replied"
    ipAddress: v.optional(v.string()),
  })
    .index("by_submitted_at", ["submittedAt"])
    .index("by_status", ["status"]),
});
