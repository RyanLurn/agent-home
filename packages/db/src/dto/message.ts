import { z } from "zod";

import type { SelectedMessage } from "@/types";

import { SelectedMessageSchema } from "@/schema/zod/message";

export function createMessageDTO(selectedMessage: SelectedMessage) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { deletedAt, readAt, createdAt, updatedAt, ...rest } = selectedMessage;

  return {
    ...rest,
    readAt: readAt === null ? null : readAt.toISOString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export const MessageDTOSchema = z.strictObject({
  ...SelectedMessageSchema.omit({ deletedAt: true }).shape,
  readAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type MessageDTO = z.infer<typeof MessageDTOSchema>;
