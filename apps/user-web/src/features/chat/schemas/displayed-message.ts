import { MessageDTOSchema } from "@repo/db/dto/message";
import { z } from "zod";

export const DisplayedMessageSchema = z.object({
  ...MessageDTOSchema.shape,
  optimisticId: z.uuidv4().nullable(),
});
export type DisplayedMessage = z.infer<typeof DisplayedMessageSchema>;
