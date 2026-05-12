import { USER_SERVER_PORT } from "@repo/core/constants/ports";

import { app } from "@/index";

const server = Bun.serve({
  port: USER_SERVER_PORT,
  fetch: app.fetch,
});

console.log(`Server running at ${server.url.href}`);
