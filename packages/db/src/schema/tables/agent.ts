import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const contextEntryTable = sqliteTable("context_entries", {
  id,
  author: text("author", { enum: ["system", "agent"] }).notNull(),
  content: text("content").notNull(),
  ...timestampsWithDelete,
});

export const notificationTable = sqliteTable("notifications", {
  id,
  source: text("source").notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: ["pending", "acknowledged"] })
    .notNull()
    .default("pending"),
  ...timestampsWithDelete,
});
