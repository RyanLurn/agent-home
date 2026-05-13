import { MessageDTOSchema } from "@repo/db/dto/message";
import { z } from "zod";

import { EnvelopeEmitterSchema } from "@/schemas/envelope/emitter";

export const NewMessageEventSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("message.new"),
  emitter: EnvelopeEmitterSchema,
  payload: MessageDTOSchema.pick({ sender: true, content: true }),
});
export type NewMessageEvent = z.infer<typeof NewMessageEventSchema>;
