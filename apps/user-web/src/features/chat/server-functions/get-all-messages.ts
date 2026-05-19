import { selectAllMessages } from "@repo/db/queries/messages/select-all";
import { createServerFn } from "@tanstack/react-start";

export const getAllMessages = createServerFn().handler(async () => {
  const result = await selectAllMessages();

  if (result.success) {
    console.log(result);
    return result.value;
  }

  console.error(result);
  throw new Error(
    JSON.stringify({
      code: result.error.code,
      message: "Failed to load messages.",
    })
  );
});
