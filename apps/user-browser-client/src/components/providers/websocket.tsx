import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
  useRef,
  use,
} from "react";
import { EnvelopeSchema, type Envelope } from "@repo/user-server/envelope";
import { rpcClient } from "@repo/user-server/rpc";

type WebSocketStatus = "errored" | "opened" | "closed";

interface WebSocketContextProps {
  status: WebSocketStatus;
  sendData: (data: Envelope) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);
  const [wsStatus, setWSStatus] = useState<WebSocketStatus>("closed");

  const sendData = useCallback((data: Envelope) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    const ws = rpcClient.ws.$ws();
    wsRef.current = ws;

    // Event handlers
    ws.onopen = () => setWSStatus("opened");
    ws.onclose = () => setWSStatus("closed");
    ws.onerror = () => setWSStatus("errored");

    ws.onmessage = (evt) => {
      const parseEventDataResult = EnvelopeSchema.safeParse(
        JSON.parse(String(evt.data))
      );

      if (parseEventDataResult.success) {
        const envelope = parseEventDataResult.data;

        // TODO: handle envelope
        console.log(envelope);
      } else {
        // TODO: handle invalid event data
        console.error(parseEventDataResult.error.issues);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext value={{ status: wsStatus, sendData }}>
      {children}
    </WebSocketContext>
  );
}

export function useWebSocket() {
  const wsContext = use(WebSocketContext);

  if (!wsContext) {
    throw new Error(
      "useWebSocket hook must be used inside a WebSocketProvider"
    );
  }

  return wsContext;
}
