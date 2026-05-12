import { z } from "zod";

import { WSClientIdSchema } from "@/schemas/ws-client-id";

export const ServerSenderSchema = z.object({ type: z.literal("server") });
export const ClientSenderSchema = z.object({
  type: z.literal("client"),
  id: WSClientIdSchema,
});

export const EventSenderSchema = z.discriminatedUnion("type", [
  ServerSenderSchema,
  ClientSenderSchema,
]);
export type EventSender = z.infer<typeof EventSenderSchema>;
