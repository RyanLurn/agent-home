import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.text("Hello Bun!"));

export default app;
