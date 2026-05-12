import { z } from "zod";

import type { WSClientId } from "@/types";

import { ServerSenderSchema } from "@/schemas/envelope/sender";

export const NewClientConnectedEventSchema = z.object({
  code: "NEW_CLIENT_CONNECTED",
  sender: ServerSenderSchema,
  newClientId: z.custom<WSClientId>(
    (value) => typeof value === "string" && value.length > 0
  ),
});
export type NewClientConnectedEvent = z.infer<
  typeof NewClientConnectedEventSchema
>;
