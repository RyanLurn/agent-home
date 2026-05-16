import type { MessageDTO } from "@repo/db/dto/message";

import { type ComponentProps, useState } from "react";
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
