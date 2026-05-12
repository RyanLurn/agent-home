import { z } from "zod";

import type { WSClientId } from "@/types";

export const ServerSenderSchema = z.object({ type: z.literal("server") });
export const ClientSenderSchema = z.object({
  type: z.literal("client"),
  id: z.custom<WSClientId>(
    (value) => typeof value === "string" && value.length > 0
  ),
});

export const EventSenderSchema = z.discriminatedUnion("type", [
  ServerSenderSchema,
  ClientSenderSchema,
]);
export type EventSender = z.infer<typeof EventSenderSchema>;
