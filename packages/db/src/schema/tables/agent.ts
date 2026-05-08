import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const contextEntryTable = sqliteTable("context_entries", {
  id,
  author: text("author", { enum: ["system", "agent"] }).notNull(),
  content: text("content").notNull(),
  ...timestampsWithDelete,
});
