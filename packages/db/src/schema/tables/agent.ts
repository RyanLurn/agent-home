import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import {
  AGENT_CONTEXT_ENTRY_AUTHORS,
  AGENT_NOTIFICATION_STATUSES,
} from "@/schema/constants";
import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const contextEntryTable = sqliteTable("context_entries", {
  id,
  author: text("author", { enum: AGENT_CONTEXT_ENTRY_AUTHORS }).notNull(),
  content: text("content").notNull(),
  ...timestampsWithDelete,
});

export const notificationTable = sqliteTable("notifications", {
  id,
  source: text("source").notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: AGENT_NOTIFICATION_STATUSES })
    .notNull()
    .default("pending"),
  ...timestampsWithDelete,
});
