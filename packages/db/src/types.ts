import type { messageTable } from "@/schema/tables/message";

export type SelectedMessage = typeof messageTable.$inferSelect;
