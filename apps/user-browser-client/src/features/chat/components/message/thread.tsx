import type { MessageDTO } from "@repo/db/dto/message";
import type { ComponentProps } from "react";

import { cn } from "@repo/ui/lib/utils";

import { MessageBubble } from "@/features/chat/components/message/bubble";

interface MessageThreadProps extends ComponentProps<"div"> {
  messages: MessageDTO[];
}

export function MessageThread({
  messages,
  className,
  ...props
}: MessageThreadProps) {
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
