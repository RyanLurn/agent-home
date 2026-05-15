import { type ReactNode, useEffect, useRef } from "react";
import { rpcClient } from "@repo/user-server/rpc";

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = rpcClient.ws.$ws();
    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  return <>{children}</>;
}
