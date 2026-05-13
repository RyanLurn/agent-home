import { insertOneMessage } from "@repo/db/queries/messages/insert-one";
import { upgradeWebSocket } from "hono/bun";
import { prettifyError } from "zod/v4/core";
import { Hono } from "hono";

import type { NewMessageBroadcastEvent } from "@/schemas/envelope/events/message";
import type { AcknowledgeEvent } from "@/schemas/envelope/events/acknowledge";
import type { ErrorEvent } from "@/schemas/envelope/events/error";

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
        // TODO: add error handling for async operations
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async onMessage(evt, ws) {
          // Parse and validate event data
          const parseEventDataResult = EnvelopeSchema.safeParse(evt.data, {
            reportInput: true,
          });

          // Handling the result
          // Valid cases
          if (parseEventDataResult.success) {
            const validEvent = parseEventDataResult.data;
            switch (validEvent.type) {
              case "message.new": {
                console.log(
                  `[User Server] User Client sent new chat message: "${validEvent.payload.content}"`
                );
                // Insert the new message into the database
                const insertedMessage = await insertOneMessage(
                  validEvent.payload
                );
                // Acknowledge this event
                const acknowledgeEvent: AcknowledgeEvent = {
                  id: crypto.randomUUID(),
                  type: "acknowledge",
                  emitter: "server",
                  acknowledgedEventId: validEvent.id,
                };
                ws.send(JSON.stringify(acknowledgeEvent));
                // Broadcast this message to all connected clients
                const broadcastEvent: NewMessageBroadcastEvent = {
                  id: crypto.randomUUID(),
                  type: "message.new.broadcast",
                  emitter: "server",
                  payload: insertedMessage,
                };
                for (const client of userWSClients) {
                  client.send(JSON.stringify(broadcastEvent));
                }
                // Done handling this case
                break;
              }
              case "error": {
                const payload = validEvent.payload;
                switch (payload.code) {
                  case "UNRECOGNIZED_EVENT_TYPE": {
                    console.warn(
                      `[User Server] User Client couldn't recognize the ${payload.unrecognizedEvent.type} event type: ${payload.message}.`
                    );
                    break;
                  }
                  case "INVALID_EVENT_DATA": {
                    console.warn(
                      `[User Server] User Client didn't accept the payload of ${payload.invalidEvent ? payload.invalidEvent.type : "our event data"}: ${payload.message}.`
                    );
                  }
                }
              }
            }
            // Invalid cases
          } else {
            // TODO: Make error handling more granular
            const errorEvent: ErrorEvent = {
              id: crypto.randomUUID(),
              type: "error",
              emitter: "server",
              payload: {
                code: "INVALID_EVENT_DATA",
                message: prettifyError(parseEventDataResult.error),
              },
            };
            ws.send(JSON.stringify(errorEvent));
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
