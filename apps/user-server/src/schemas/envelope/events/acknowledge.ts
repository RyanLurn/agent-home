import { z } from "zod";

import { EnvelopeEmitterSchema } from "@/schemas/envelope/emitter";

export const AcknowledgeEventSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("acknowledge"),
  emitter: EnvelopeEmitterSchema,
  acknowledgedEventId: z.uuidv4(),
});
export type AcknowledgeEvent = z.infer<typeof AcknowledgeEventSchema>;
