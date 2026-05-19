import type { Failure, Success } from "@repo/core/types/result";
import type { MessageDTO } from "@repo/db/dto/message";

import { selectAllMessages } from "@repo/db/queries/messages/select-all";
import { getRequest } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const getAllMessages = createServerFn().handler(async () => {
  const startTime = performance.now();

  const request = getRequest();

  const selectAllMessagesResult = await selectAllMessages();

  if (selectAllMessagesResult.success) {
    const allMessages = selectAllMessagesResult.value;

    const endTime = performance.now();
    const getAllMessagesResult: Success<MessageDTO[]> = {
      success: true,
      value: allMessages,
      context: {
        functionName: "getAllMessages" as const,
        args: {},
        metadata: {
          request,
          selectAllMessagesResult,
        },
        performance: {
          startTime,
          endTime,
          duration: endTime - startTime,
        },
      },
    };
    console.log(getAllMessagesResult);

    return allMessages;
  }

  const error = new Error("Failed to load messages.");

  const endTime = performance.now();
  const getAllMessagesResult: Failure<Error> = {
    success: false,
    error,
    context: {
      functionName: "getAllMessages" as const,
      args: {},
      metadata: {
        request,
        selectAllMessagesResult,
      },
      performance: {
        startTime,
        endTime,
        duration: endTime - startTime,
      },
    },
  };
  console.error(getAllMessagesResult);

  throw error;
});
