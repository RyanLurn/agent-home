import { app } from "@/index";

const server = Bun.serve({
  fetch: app.fetch,
});

console.log(`Agent API running at ${server.url.href}`);
