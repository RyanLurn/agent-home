import { MessageDTOSchema } from "@repo/db/dto/message";
import EventEmitter from "node:events";
import { z } from "zod";

export const chatEventEmitter = new EventEmitter();

export const NewMessageEventSchema = z.object({
  event: z.literal("new-message"),
  id: MessageDTOSchema.shape.id,
  data: MessageDTOSchema,
});
export type NewMessageEvent = z.infer<typeof NewMessageEventSchema>;
