import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getThanks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("thanks").collect();
  },
});

export const createThanksItem = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, description, date } = args;
    await ctx.db.insert("thanks", {
      name,
      description,
      date,
    });
  },
});
