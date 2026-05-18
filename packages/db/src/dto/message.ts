import { z } from "zod";

import type { SelectedMessage } from "@/types";

import { MESSAGE_SENDERS } from "@/schema/constants";

export function createMessageDTO(selectedMessage: SelectedMessage) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { deletedAt, sentAt, shownAt, readAt, createdAt, updatedAt, ...rest } =
    selectedMessage;

  return {
    ...rest,
    sentAt: sentAt.toISOString(),
    shownAt: shownAt === null ? null : shownAt.toISOString(),
    readAt: readAt === null ? null : readAt.toISOString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export const MessageDTOSchema = z.strictObject({
  id: z.uuidv7(),
  sender: z.enum(MESSAGE_SENDERS),
  content: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type MessageDTO = z.infer<typeof MessageDTOSchema>;
