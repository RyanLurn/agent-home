import type { SelectedContextEntry } from "@repo/db/types";
import type { ModelMessage } from "ai";

export function mapContextEntriesToAISDKModelMessages(
  contextEntries: SelectedContextEntry[]
): ModelMessage[] {
  return contextEntries.map((entry) => ({
    role: entry.author === "agent" ? "assistant" : "user",
    content: entry.content,
  }));
}
