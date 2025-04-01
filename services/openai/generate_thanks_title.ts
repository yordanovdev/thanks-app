import { openai } from "./openai";

export const generate_thanks_title = async (description: string) => {
  const response = await openai.responses.create({
    model: "o3-mini",
    input: [
      {
        role: "developer",
        content: [
          {
            type: "input_text",
            text: "Generate a concise and descriptive title that summarizes a user's expression of gratitude or thanks based on the provided description. Make the title short and clear and keep the original language",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: description,
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "title_object",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the object.",
            },
          },
          required: ["title"],
          additionalProperties: false,
        },
      },
    },
    reasoning: {
      effort: "low",
    },
    tools: [],
    store: true,
  });

  return JSON.parse(response.output_text).title;
};
