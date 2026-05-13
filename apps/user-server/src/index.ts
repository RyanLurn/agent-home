import { upgradeWebSocket } from "hono/bun";
import { Hono } from "hono";

import { userWSClients } from "@/memory";

export const app = new Hono()
  .get("/", (c) => c.text("Hello Bun!"))
  .get(
    "/ws",
    upgradeWebSocket(() => {
      return {
        onOpen(_evt, ws) {
          // Add this connection to the list of connected clients
          userWSClients.add(ws);
          const totalclients = userWSClients.size;
          console.log(
            `[User Server] A wild user client appeared! Encountered ${totalclients} client${totalclients > 1 ? "s" : ""}.`
          );
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
