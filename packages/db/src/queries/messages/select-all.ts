import { isNull } from "drizzle-orm";

import { messageTable } from "@/schema/tables/message";
import { createMessageDTO } from "@/dto/message";
import { db } from "@/index";

export async function selectAllMessages() {
  const selectedMessages = await db
    .select()
    .from(messageTable)
    .where(isNull(messageTable.deletedAt));

  return selectedMessages.map((message) => createMessageDTO(message));
}
