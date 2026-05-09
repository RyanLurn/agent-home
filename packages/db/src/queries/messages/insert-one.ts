import type { InsertedMessage } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function insertOneMessage(message: InsertedMessage) {
  const [returnedMessage] = await db
    .insert(messageTable)
    .values(message)
    .returning();

  return returnedMessage ?? null;
}
