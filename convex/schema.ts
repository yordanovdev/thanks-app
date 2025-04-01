import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  thanks: defineTable({
    name: v.optional(v.string()),
    description: v.string(),
    date: v.string(),
    userId: v.optional(v.string()),
  }),
});
