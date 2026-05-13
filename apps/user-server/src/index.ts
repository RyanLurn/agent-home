import { upgradeWebSocket } from "hono/bun";
import { Hono } from "hono";

import type { NewMessageEvent } from "@/schemas/envelope/events/message";

import { EnvelopeSchema } from "@/schemas/envelope";
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
          // Parse and validate event data
          const parseEventDataResult = EnvelopeSchema.safeParse(evt.data);

          // Handling the result
          // Valid cases
          if (parseEventDataResult.success) {
            const validEvent = parseEventDataResult.data;
            switch (validEvent.type) {
              case "message.new": {
                // TODO: Insert the new message into the database
                console.log(
                  `[User Server] User Client sent new chat message: "${validEvent.payload.content}"`
                );
                // Broadcast the message to all clients
                for (const client of userWSClients) {
                  const newMessageEvent: NewMessageEvent = {
                    ...validEvent,
                    emitter: "server",
                  };
                  client.send(JSON.stringify(newMessageEvent));
                }
              }
            }
          }
        },
        onClose(_evt, ws) {
          // Remove this connection from the list of connected clients
          userWSClients.delete(ws);
          const totalclients = userWSClients.size;
          console.log(
            `[User Server] A wild user client ran away! Only ${totalclients} client${totalclients > 1 ? "s" : ""} left.`
          );
        },
      };
    })
  );
