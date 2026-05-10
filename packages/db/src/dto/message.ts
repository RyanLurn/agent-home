import type { SelectedMessage } from "@/types";

export function createMessageDTO(selectedMessage: SelectedMessage) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, deletedAt, ...rest } = selectedMessage;

  return {
    ...rest,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export type MessageDTO = ReturnType<typeof createMessageDTO>;
