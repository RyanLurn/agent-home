import type { MessageDTO } from "@repo/db/dto/message";

import { type ComponentProps, useEffect, useState } from "react";
import { toast } from "@repo/ui/components/toaster";
import { cn } from "@repo/ui/lib/utils";

import { MessageBubble } from "@/features/chat/components/message/bubble";

interface MessageThreadProps extends ComponentProps<"div"> {
  initialMessages: MessageDTO[];
}

export function MessageThread({
  initialMessages,
  className,
  ...props
}: MessageThreadProps) {
  const [messages] = useState(initialMessages);

  useEffect(() => {
    const chatEventSource = new EventSource("/api/sse/chat");

    // Event handlers
    chatEventSource.onopen = () =>
      toast.success(
        `SSE endpoint connected with ready state of "${chatEventSource.readyState}"`
      );
    chatEventSource.onerror = () =>
      toast.error("An error occurred while attempting to connect.");

    chatEventSource.addEventListener("ping", () => {
      toast.info("Pinged by server");
    });

    return () => {
      chatEventSource.close();
    };
  }, []);

  return (
    <div
      className={cn("flex size-full flex-col gap-y-6", className)}
      {...props}
    >
      {messages.map((message) => (
        <MessageBubble message={message} key={message.id} />
      ))}
    </div>
  );
}
