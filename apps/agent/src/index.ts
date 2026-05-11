import { generateText } from "ai";

import { mapContextEntriesToAISDKModelMessages } from "@/utils/data-mapping";
import { googleGenAIProvider } from "@/lib/llm-providers/google-genai";
import { getState } from "@/get-state";

const mode: "standby" | "auto" = "auto";
let turn = 0;

while (mode === "auto") {
  turn++;
  console.log(`[AGENT] Turn ${turn}`);

  // Get agent's state
  const state = await getState();
  const messages = mapContextEntriesToAISDKModelMessages(state.contextEntries);

  // Call LLM API
  const { text } = await generateText({
    model: googleGenAIProvider("gemma-4-31b-it"),
    messages,
  });
  console.log(`[AGENT LLM] Text: ${text}`);

  // TODO: Execute script in sandbox
  console.log("[AGENT SANDBOX] Executing code inside sandbox...");
}
