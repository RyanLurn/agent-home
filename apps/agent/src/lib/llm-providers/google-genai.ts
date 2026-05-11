import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { envVars } from "@/lib/env-vars";

export const googleGenAIProvider = createGoogleGenerativeAI({
  apiKey: envVars.GEMINI_API_KEY,
});
