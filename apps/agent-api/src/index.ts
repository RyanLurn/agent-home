import { Hono } from "hono";

import { messagesRoutes } from "@/resources/messages";

export const app = new Hono()
  .get("/", (c) => c.text("OK"))
  .route("/messages", messagesRoutes);
