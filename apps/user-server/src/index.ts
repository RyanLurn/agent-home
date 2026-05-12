import type { WSContext } from "hono/ws";

import { upgradeWebSocket } from "hono/bun";
import { Hono } from "hono";

import type { ClientConnectedEnvelope } from "@/envelope";

const clients: WSContext[] = [];

export const app = new Hono()
  .get("/", (c) => c.text("Hello Bun!"))
  .get(
    "/ws",
    upgradeWebSocket(() => {
      return {
        onOpen(_evt, ws) {
          clients.push(ws);

          const envelope: ClientConnectedEnvelope = {
            code: "CLIENT_CONNECTED_EVENT",
            sender: "server",
          };
          ws.send(JSON.stringify(envelope));
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
