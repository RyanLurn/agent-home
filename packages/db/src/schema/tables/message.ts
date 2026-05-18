import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import { MESSAGE_STATUSES, MESSAGE_SENDERS } from "@/schema/constants";
import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const messageTable = sqliteTable("messages", {
  id,
  sender: text("sender", { enum: MESSAGE_SENDERS }).notNull(),
  content: text("content").notNull(),
  status: text("status", { enum: MESSAGE_STATUSES }).notNull().default("sent"),
  sentAt: integer("sent_at", { mode: "timestamp_ms" }).notNull(),
  shownAt: integer("shown_at", { mode: "timestamp_ms" }),
  readAt: integer("read_at", { mode: "timestamp_ms" }),
  ...timestampsWithDelete,
});
