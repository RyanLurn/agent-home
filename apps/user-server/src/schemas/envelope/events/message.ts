import { MESSAGE_SENDERS } from "@repo/db/schema/constants";
import { z } from "zod";

export const NewMessageEventSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("message.new"),
  payload: z.object({
    sender: z.enum(MESSAGE_SENDERS),
    content: z.string(),
  }),
});
export type NewMessageEvent = z.infer<typeof NewMessageEventSchema>;
