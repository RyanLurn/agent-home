import { z } from "zod";

import { EnvelopeEmitterSchema } from "@/schemas/envelope/emitter";

export const UnrecognizedEventTypePayloadSchema = z.object({
  code: z.literal("UNRECOGNIZED_EVENT_TYPE"),
  message: z.string().min(1),
  unrecognizedEvent: z.object({
    id: z.uuidv4(),
    type: z.string(),
  }),
});
export type UnrecognizedEventTypePayload = z.infer<
  typeof UnrecognizedEventTypePayloadSchema
>;

export const InvalidEventDataPayloadSchema = z.object({
  code: z.literal("INVALID_EVENT_DATA"),
  message: z.string().min(1),
  invalidEvent: z
    .object({
      id: z.uuidv4(),
      type: z.string(),
    })
    .optional(),
});
export type InvalidEventDataPayload = z.infer<
  typeof InvalidEventDataPayloadSchema
>;

export const ErrorEventSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("error"),
  emitter: EnvelopeEmitterSchema,
  payload: z.discriminatedUnion("code", [
    UnrecognizedEventTypePayloadSchema,
    InvalidEventDataPayloadSchema,
  ]),
});
export type ErrorEvent = z.infer<typeof ErrorEventSchema>;
