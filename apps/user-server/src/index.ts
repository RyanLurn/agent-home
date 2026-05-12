import { upgradeWebSocket } from "hono/bun";
import { Hono } from "hono";

export const app = new Hono()
  .get("/", (c) => c.text("Hello Bun!"))
  .get(
    "/ws",
    upgradeWebSocket((c) => {
      return {
        onOpen(evt, ws) {
          console.log("A wild client appeared!");
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
