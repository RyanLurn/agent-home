import { MessageDTOSchema } from "@repo/db/dto/message";
import { validator } from "hono/validator";
import { Hono } from "hono";

export const chatAPI = new Hono().post(
  "/messages",
  validator("json", (value, c) => {
    const validationResult = MessageDTOSchema.pick({ id: true }).safeParse(
      value
    );

    if (validationResult.success) {
      return validationResult.data;
    }

    return c.json(
      {
        error: {
          message: "Invalid request body",
          code: "VALIDATION_ERROR",
          issues: validationResult.error.issues,
        },
      },
      422
    );
  }),
  (c) => {
    const { id } = c.req.valid("json");
    return c.json({ data: id }, 201);
  }
);
