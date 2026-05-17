import { selectMessageById } from "@repo/db/queries/messages/select-by-id";
import { MessageDTOSchema, type MessageDTO } from "@repo/db/dto/message";
import { validator } from "hono/validator";
import { streamSSE } from "hono/streaming";
import { Hono } from "hono";

import {
  emitNewMessageEvent,
  chatEventEmitter,
} from "@/features/chat/event-emitter";

export const chatAPI = new Hono()
  .basePath("/messages")
  .post(
    "/",
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
    async (c) => {
      const { id } = c.req.valid("json");
      const selectResult = await selectMessageById({ id });

      if (selectResult.success) {
        emitNewMessageEvent(selectResult.data);
        return c.json({ data: { event: "new-message", id } }, 201);
      }

      const selectError = selectResult.error;

      if (selectError.code === "NOT_FOUND_ERROR") {
        return c.json(
          {
            error: {
              message: `Could not find chat message with id: ${id}`,
              code: selectError.code,
              nonExistentId: id,
            },
          },
          400
        );
      }

      return c.json(
        {
          error: {
            message: "Internal server error",
            code: "INTERNAL_SERVER_ERROR",
          },
        },
        500
      );
    }
  )
  .get("/stream", (c) => {
    return streamSSE(c, async (stream) => {
      function newMessageEventListenrer(newMessage: MessageDTO) {
        const sseMessage = {
          event: "new-message",
          id: newMessage.id,
          data: JSON.stringify(newMessage),
        };
        void stream.writeSSE(sseMessage);
      }

      chatEventEmitter.on("new-message", newMessageEventListenrer);

      // Keep alive
      while (!stream.aborted) {
        await stream.sleep(5000);
        await stream.writeSSE({ event: "ping", data: "" });
      }
    });
  });
