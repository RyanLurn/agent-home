import type { ComponentProps, KeyboardEvent } from "react";

import { Spinner } from "@repo/ui/components/spinner";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

import { sendMessage } from "@/features/chat/server-functions/send-message";

export function ChatInput({ className, ...props }: ComponentProps<"div">) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const messageContent = input.trim();
    setInput("");

    setIsSending(true);
    await sendMessage({ data: { content: messageContent } });
    setIsSending(false);
  }

  async function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      await handleSend();
    }
  }

  return (
    <div
      className={cn(
        "sticky bottom-6 flex w-full flex-col gap-y-2 rounded-md bg-card p-3",
        className
      )}
      {...props}
    >
      <textarea
        className={cn("resize-none focus:outline-none", className)}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => void handleKeyDown(e)}
        placeholder="Type your message"
        disabled={isSending}
        value={input}
        rows={3}
      />
      <Button
        onClick={() => void handleSend()}
        disabled={isSending}
        className="ml-auto"
        size="icon"
      >
        {isSending ? <Spinner /> : <Send />}
      </Button>
    </div>
  );
}
