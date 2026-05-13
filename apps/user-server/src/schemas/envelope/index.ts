import { z } from "zod";

import { AcknowledgeEventSchema } from "@/schemas/envelope/events/acknowledge";
import { NewMessageEventSchema } from "@/schemas/envelope/events/message";
import { ErrorEventSchema } from "@/schemas/envelope/events/error";

export const EnvelopeSchema = z.discriminatedUnion("type", [
  AcknowledgeEventSchema,
  NewMessageEventSchema,
  ErrorEventSchema,
]);
export type Envelope = z.infer<typeof EnvelopeSchema>;
