import type { WSContext } from "hono/ws";

import { upgradeWebSocket } from "hono/bun";
import { Hono } from "hono";

const clients: WSContext[] = [];

export const app = new Hono()
  .get("/", (c) => c.text("Hello Bun!"))
  .get(
    "/ws",
    upgradeWebSocket((c) => {
      return {
        onOpen(_evt, ws) {
          clients.push(ws);
        },
        onMessage(evt, ws) {
          console.log("The wild client used Send Message!");
        },
        onClose(evt, ws) {
          console.log("The wild client ran away!");
        },
      };
    })
  );
