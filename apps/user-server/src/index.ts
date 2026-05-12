import type { WSContext } from "hono/ws";

import { upgradeWebSocket } from "hono/bun";
import { Hono } from "hono";

import type {
  NewClientAcknowledgedEnvelope,
  NewClientConnectedEnvelope,
} from "@/envelope";

const clients: WSContext[] = [];

export const app = new Hono()
  .get("/", (c) => c.text("Hello Bun!"))
  .get(
    "/ws",
    upgradeWebSocket(() => {
      return {
        onOpen(_evt, ws) {
          // Add this connection to the list of connected clients
          clients.push(ws);

          // Send server's acknowledgement to this client
          const newClientAcknowledgedEnvelope: NewClientAcknowledgedEnvelope = {
            code: "NEW_CLIENT_ACKNOWLEDGED_EVENT",
            sender: "server",
          };
          ws.send(JSON.stringify(newClientAcknowledgedEnvelope));

          // Inform other clients about this newly connected client
          const newClientConnectedEnvelope: NewClientConnectedEnvelope = {
            code: "NEW_CLIENT_CONNECTED_EVENT",
            sender: "server",
          };
          clients.map((client) => {
            if (client !== ws) {
              client.send(JSON.stringify(newClientConnectedEnvelope));
            }
          });
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
