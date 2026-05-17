import { Hono } from "hono";

import { chatAPI } from "@/features/chat/api";

export const api = new Hono().basePath("/api").route("/chat", chatAPI);
