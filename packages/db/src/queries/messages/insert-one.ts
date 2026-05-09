import type { Result } from "@repo/core/types/result";

import type { InsertedMessage, SelectedMessage } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function insertOneMessage(
  message: InsertedMessage
): Promise<Result<SelectedMessage, Error>> {
  const [returnedMessage] = await db
    .insert(messageTable)
    .values(message)
    .returning();

  if (returnedMessage) {
    return {
      success: true,
      data: returnedMessage,
    };
  }

  return {
    success: false,
    error: new Error("Edge case"),
  };
}
