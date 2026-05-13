import type { WSContext } from "hono/ws";

export const userWSClients = new Set<WSContext>();
