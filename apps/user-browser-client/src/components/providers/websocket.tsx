import type { Envelope } from "@repo/user-server/envelope";

import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { rpcClient } from "@repo/user-server/rpc";

interface WebSocketContextProps {
  sendData: (data: Envelope) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);

  const sendData = useCallback((data: Envelope) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    const ws = rpcClient.ws.$ws();
    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  return <WebSocketContext value={{ sendData }}>{children}</WebSocketContext>;
}
