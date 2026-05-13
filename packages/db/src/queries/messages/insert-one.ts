import type { InsertedMessage, SelectedMessage } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { createMessageDTO } from "@/dto/message";
import { db } from "@/index";

export async function insertOneMessage({
  sender,
  content,
}: {
  sender: InsertedMessage["sender"];
  content: InsertedMessage["content"];
}) {
  const [returnedMessage] = await db
    .insert(messageTable)
    .values({ sender, content })
    .returning();

  // returnedMessage should never be undefined. Type assertion exists to make TypeScript happy.
  return createMessageDTO(returnedMessage as SelectedMessage);
}
