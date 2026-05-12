import type { ServerWebSocket } from "bun";
import type { WSContext } from "hono/ws";

export type Client = WSContext<ServerWebSocket>;
