import { createFileRoute } from "@tanstack/react-router";
import { Hono } from "hono";

const api = new Hono().basePath("/api");

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: ({ request }) => api.fetch(request),
    },
  },
});
