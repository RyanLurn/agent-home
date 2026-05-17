import { AGENT_API_PORT } from "@repo/core/constants/ports";

import { app } from "@/index";

const server = Bun.serve({
  port: AGENT_API_PORT,
  fetch: app.fetch,
});

console.log(`Agent API running at ${server.url.href}`);
