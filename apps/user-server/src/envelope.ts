import { z } from "zod";

const EnvelopeSenderSchema = z.enum(["client", "server"]);

export const ClientConnectedEnvelopeSchema = z.object({
  code: z.literal("CLIENT_CONNECTED_EVENT"),
  sender: EnvelopeSenderSchema.extract(["server"]),
});
export type ClientConnectedEnvelope = z.infer<
  typeof ClientConnectedEnvelopeSchema
>;

export const NewChatMessageSentEnvelopeSchema = z.object({
  code: z.literal("NEW_CHAT_MESSAGE_SENT_EVENT"),
  sender: EnvelopeSenderSchema,
  message: z.object({
    id: z.uuid(),
    sender: z.enum(["user", "agent"]),
    content: z.string(),
  }),
});
export type NewChatMessageSentEnvelope = z.infer<
  typeof NewChatMessageSentEnvelopeSchema
>;

export const NewChatMessageAcknowledgedEnvelopeSchema = z.object({
  code: z.literal("NEW_CHAT_MESSAGE_ACKNOWLEDGED_EVENT"),
  sender: EnvelopeSenderSchema,
});
export type NewChatMessageAcknowledgedEnvelope = z.infer<
  typeof NewChatMessageAcknowledgedEnvelopeSchema
>;

export const EnvelopeSchema = z.discriminatedUnion("code", [
  ClientConnectedEnvelopeSchema,
  NewChatMessageSentEnvelopeSchema,
  NewChatMessageAcknowledgedEnvelopeSchema,
]);
export type Envelope = z.infer<typeof EnvelopeSchema>;
