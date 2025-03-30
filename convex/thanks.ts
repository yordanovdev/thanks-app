import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getThanks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("thanks").order("desc").collect();
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

export const deleteThanksItem = mutation({
  args: {
    id: v.id("thanks"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const updateThanksItem = mutation({
  args: {
    id: v.id("thanks"),
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, name, description } = args;
    await ctx.db.patch(id, {
      name,
      description,
    });
  },
});
