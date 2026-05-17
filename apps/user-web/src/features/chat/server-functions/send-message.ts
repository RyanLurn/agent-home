import { insertOneMessage } from "@repo/db/queries/messages/insert-one";
import { MessageDTOSchema } from "@repo/db/dto/message";
import { createServerFn } from "@tanstack/react-start";

import { emitNewMessageEvent } from "@/features/chat/event-emitter";

const SentMessageSchema = MessageDTOSchema.pick({ content: true });

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator(SentMessageSchema)
  .handler(async ({ data }) => {
    const returnedMessage = await insertOneMessage({
      sender: "user",
      content: data.content,
    });
    emitNewMessageEvent(returnedMessage);
  });
