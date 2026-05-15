import { z } from "zod";

import {
  NewMessageBroadcastEventSchema,
  NewMessageEventSchema,
} from "@/schemas/envelope/events/message";
import { AcknowledgeEventSchema } from "@/schemas/envelope/events/acknowledge";
import { ErrorEventSchema } from "@/schemas/envelope/events/error";

export const EnvelopeSchema = z.discriminatedUnion("type", [
  AcknowledgeEventSchema,
  NewMessageEventSchema,
  NewMessageBroadcastEventSchema,
  ErrorEventSchema,
]);
export type Envelope = z.infer<typeof EnvelopeSchema>;
