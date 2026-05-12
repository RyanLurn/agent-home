import { USER_SERVER_PORT } from "@repo/core/constants/ports";
import { websocket } from "hono/bun";

import { app } from "@/index";

const server = Bun.serve({
  port: USER_SERVER_PORT,
  fetch: app.fetch,
  websocket,
});

console.log(`Server running at ${server.url.href}`);
