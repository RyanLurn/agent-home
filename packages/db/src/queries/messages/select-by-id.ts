import type { Result } from "@repo/core/types/result";

import { NotFoundError } from "@repo/core/error/classes/not-found";
import { isNull, and, eq } from "drizzle-orm";

import type { Message } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function selectMessageById({
  id,
}: {
  id: Message["id"];
}): Promise<Result<Message, NotFoundError<"message">>> {
  const [selectedMessage] = await db
    .select()
    .from(messageTable)
    .where(and(eq(messageTable.id, id), isNull(messageTable.deletedAt)));

  if (selectedMessage) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { deletedAt, ...message } = selectedMessage;
    return {
      success: true,
      data: message,
    };
  }

  return {
    success: false,
    error: new NotFoundError<"message">({ context: { resource: "message" } }),
  };
}
