import { insertOneMessage } from "@repo/db/queries/messages/insert-one";
import { validator } from "hono/validator";
import { Hono } from "hono";
import { z } from "zod";

const PostMessagesInputSchema = z.object({
  content: z.string().trim().normalize().pipe(z.string().min(1).max(10_000)),
});

export const messagesRoutes = new Hono().post(
  "/",
  validator("json", (value, c) => {
    const parseResult = PostMessagesInputSchema.safeParse(value, {
      reportInput: true,
    });

    if (parseResult.success) {
      return parseResult.data;
    }

    return c.json(
      {
        error: {
          message: "Invalid request body",
          code: "VALIDATION_ERROR",
          issues: parseResult.error.issues,
        },
      },
      422
    );
  }),
  async (c) => {
    const body = c.req.valid("json");
    const returnedMessage = await insertOneMessage({
      sender: "agent",
      content: body.content,
    });
    return c.json({ data: returnedMessage }, 201);
  }
);
