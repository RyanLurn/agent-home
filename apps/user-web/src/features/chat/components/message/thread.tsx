import { MessageDTOSchema, type MessageDTO } from "@repo/db/dto/message";
import { type ComponentProps, useEffect, useState } from "react";
import { toast } from "@repo/ui/components/toaster";
import { cn } from "@repo/ui/lib/utils";
import { prettifyError } from "zod";

import { MessageBubble } from "@/features/chat/components/message/bubble";

interface MessageThreadProps extends ComponentProps<"div"> {
  initialMessages: MessageDTO[];
}

export function MessageThread({
  initialMessages,
  className,
  ...props
}: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);

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

    chatEventSource.addEventListener("new-message", (event) => {
      const parseEventDataResult = MessageDTOSchema.safeParse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        JSON.parse(event.data)
      );
      if (parseEventDataResult.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          parseEventDataResult.data,
        ]);
      } else {
        toast.error(prettifyError(parseEventDataResult.error));
      }
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
