import { MessageDTOSchema } from "@repo/db/dto/message";
import { z } from "zod";

import { EnvelopeEmitterSchema } from "@/schemas/envelope/emitter";

export const NewMessageEventSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("message.new"),
  emitter: EnvelopeEmitterSchema.extract(["client"]),
  payload: z.object({
    sender: MessageDTOSchema.shape.sender.extract(["user"]),
    content: MessageDTOSchema.shape.content,
  }),
});
export type NewMessageEvent = z.infer<typeof NewMessageEventSchema>;

export const NewMessageBroadcastEventSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("message.new.broadcast"),
  emitter: EnvelopeEmitterSchema.extract(["server"]),
  payload: MessageDTOSchema,
});
export type NewMessageBroadcastEvent = z.infer<
  typeof NewMessageBroadcastEventSchema
>;
