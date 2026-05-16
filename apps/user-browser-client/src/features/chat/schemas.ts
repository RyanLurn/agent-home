import { MessageDTOSchema } from "@repo/db/dto/message";
import { z } from "zod";

export const NewMessageEventSchema = z.object({
  event: z.literal("new-message"),
  id: MessageDTOSchema.shape.id,
  data: MessageDTOSchema,
});
export type NewMessageEvent = z.infer<typeof NewMessageEventSchema>;
