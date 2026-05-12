import { z } from "zod";

import { ServerSenderSchema } from "@/schemas/envelope/sender";
import { WSClientIdSchema } from "@/schemas/ws-client-id";

export const NewClientConnectedEventSchema = z.object({
  code: "NEW_CLIENT_CONNECTED",
  sender: ServerSenderSchema,
  newClientId: WSClientIdSchema,
});
export type NewClientConnectedEvent = z.infer<
  typeof NewClientConnectedEventSchema
>;
