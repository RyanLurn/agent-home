import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { MESSAGE_SENDERS } from "@/schema/constants";
import { id } from "@/schema/helpers/id";

export const messageTable = sqliteTable("messages", {
  id,
  sender: text("sender", { enum: MESSAGE_SENDERS }).notNull(),
  content: text().notNull(),
});
