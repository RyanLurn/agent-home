import type { Branded } from "@repo/core/types/branded";
import type { ServerWebSocket } from "bun";
import type { WSContext } from "hono/ws";

export type WSClientId = Branded<string, "WSClientId">;
export type WSClient = {
  id: WSClientId;
  ws: WSContext<ServerWebSocket>;
};
