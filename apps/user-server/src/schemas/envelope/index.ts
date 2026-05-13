import { z } from "zod";

import { NewMessageEventSchema } from "@/schemas/envelope/events/message";
import { ErrorEventSchema } from "@/schemas/envelope/events/error";

export const EnvelopeSchema = z.discriminatedUnion("type", [
  NewMessageEventSchema,
  ErrorEventSchema,
]);
export type Envelope = z.infer<typeof EnvelopeSchema>;
