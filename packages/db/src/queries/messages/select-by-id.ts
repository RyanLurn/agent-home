import { isNull, and, eq } from "drizzle-orm";

import type { Message } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function selectMessageById({ id }: { id: Message["id"] }) {
  const [selectedMessage] = await db
    .select()
    .from(messageTable)
    .where(and(eq(messageTable.id, id), isNull(messageTable.deletedAt)));

  return selectedMessage;
}
