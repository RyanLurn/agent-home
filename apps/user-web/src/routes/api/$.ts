import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: ({ request }) => api.fetch(request),
    },
  },
});
