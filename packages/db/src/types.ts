import type { contextEntryTable } from "@/schema/tables/agent";
import type { messageTable } from "@/schema/tables/message";

export type SelectedContextEntry = typeof contextEntryTable.$inferSelect;
export type InsertedContextEntry = typeof contextEntryTable.$inferInsert;

export type SelectedMessage = typeof messageTable.$inferSelect;
export type InsertedMessage = typeof messageTable.$inferInsert;

export type Message = Omit<SelectedMessage, "deletedAt">;
