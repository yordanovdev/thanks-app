import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { generate_thanks_title } from "../services/openai/generate_thanks_title";

export const getThanks = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    return await ctx.db
      .query("thanks")
      .filter((q) => q.eq(q.field("userId"), user?.tokenIdentifier ?? ""))
      .order("desc")
      .collect();
  },
});

export const getThanksById = query({
  args: {
    id: v.id("thanks"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const thanks = await ctx.db.get(id);
    if (!thanks) {
      throw new Error("Thanks item not found");
    }
    return thanks;
  },
});

export const createThanksItem = mutation({
  args: {
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { description, date } = args;
    const user = await ctx.auth.getUserIdentity();
    const id = await ctx.db.insert("thanks", {
      description,
      date,
      userId: user?.tokenIdentifier ?? "",
    });

    await ctx.scheduler.runAfter(0, api.thanks.generate_title, {
      thanksId: id,
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

export const generate_title = action({
  args: {
    thanksId: v.id("thanks"),
  },
  handler: async (ctx, args) => {
    const thanks = await ctx.runQuery(api.thanks.getThanksById, {
      id: args.thanksId,
    });

    if (!thanks) {
      throw new Error("Thanks item not found");
    }

    const generatedText = await generate_thanks_title(thanks.description);

    await ctx.runMutation(api.thanks.updateThanksItem, {
      id: args.thanksId,
      name: generatedText,
      description: thanks.description,
    });
  },
});
