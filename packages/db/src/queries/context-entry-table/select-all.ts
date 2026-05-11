import { isNull } from "drizzle-orm";

import { contextEntryTable } from "@/schema/tables/agent";
import { db } from "@/index";

export async function selectAllContextEntries() {
  const entries = await db
    .select()
    .from(contextEntryTable)
    .where(isNull(contextEntryTable.deletedAt));

  return entries;
}
