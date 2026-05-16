import { createFileRoute } from "@tanstack/react-router";

import { getAllMessages } from "@/features/chat/server-functions/get-all-messages";
import { MessageThread } from "@/features/chat/components/message/thread";

export const Route = createFileRoute("/")({
  loader: () => getAllMessages(),
  component: IndexPage,
});

function IndexPage() {
  const initialMessages = Route.useLoaderData();

  return (
    <div className="mx-auto flex size-full max-w-2xl flex-col items-center gap-y-6">
      <MessageThread
        initialMessages={initialMessages}
        className="my-6 flex-1"
      />
    </div>
  );
}
