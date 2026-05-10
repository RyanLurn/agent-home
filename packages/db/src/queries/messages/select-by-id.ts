import type { Result } from "@repo/core/types/result";

import { NotFoundError } from "@repo/core/error/classes/not-found";
import { isNull, and, eq } from "drizzle-orm";

import type { SelectedMessage } from "@/types";

import { createMessageDTO, type MessageDTO } from "@/dto/message";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function selectMessageById({
  id,
}: {
  id: SelectedMessage["id"];
}): Promise<Result<MessageDTO, NotFoundError<"message">>> {
  const [selectedMessage] = await db
    .select()
    .from(messageTable)
    .where(and(eq(messageTable.id, id), isNull(messageTable.deletedAt)));

  if (selectedMessage) {
    return {
      success: true,
      data: createMessageDTO(selectedMessage),
    };
  }

  return {
    success: false,
    error: new NotFoundError<"message">({ context: { resource: "message" } }),
  };
}
