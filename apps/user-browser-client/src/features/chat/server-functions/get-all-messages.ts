import { selectAllMessages } from "@repo/db/queries/messages/select-all";
import { createServerFn } from "@tanstack/react-start";

export const getAllMessages = createServerFn().handler(async () => {
  const messages = await selectAllMessages();
  return messages;
});
