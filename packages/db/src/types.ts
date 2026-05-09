import type { messageTable } from "@/schema/tables/message";

export type SelectedMessage = typeof messageTable.$inferSelect;
export type InsertedMessage = typeof messageTable.$inferInsert;

export type Message = Omit<SelectedMessage, "deletedAt">;
