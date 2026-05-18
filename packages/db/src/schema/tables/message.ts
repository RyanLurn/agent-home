import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { MESSAGE_SENDERS } from "@/schema/constants";
import { id } from "@/schema/helpers/id";

export const messageTable = sqliteTable("messages", {
  id,
  sender: text("sender", { enum: MESSAGE_SENDERS }).notNull(),
  content: text("content").notNull(),
  readAt: integer("read_at", { mode: "timestamp_ms" }),
  ...timestampsWithDelete,
});
