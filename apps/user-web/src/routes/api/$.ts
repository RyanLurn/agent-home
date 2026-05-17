import type { MessageDTO } from "@repo/db/dto/message";

import { createFileRoute } from "@tanstack/react-router";
import { streamSSE } from "hono/streaming";
import { Hono } from "hono";

import { chatEventEmitter } from "@/features/chat/event-emitter";

const api = new Hono().basePath("/api").get("/sse/chat", (c) => {
  return streamSSE(c, async (stream) => {
    function newMessageEventListenrer(newMessage: MessageDTO) {
      const sseMessage = {
        event: "new-message",
        id: newMessage.id,
        data: JSON.stringify(newMessage),
      };
      void stream.writeSSE(sseMessage);
    }

    chatEventEmitter.on("new-message", newMessageEventListenrer);

    // Keep alive
    while (!stream.aborted) {
      await stream.sleep(5000);
      await stream.writeSSE({ event: "ping", data: "" });
    }
  });
});

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: ({ request }) => api.fetch(request),
    },
  },
});
