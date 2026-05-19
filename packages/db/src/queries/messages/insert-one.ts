import type { Context, Result } from "@repo/core/types/result";
import type { StrictOmit } from "@repo/core/types/strict-omit";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { SQLiteError } from "bun:sqlite";

import type { InsertedMessage, SelectedMessage } from "@/types";

import { createMessageDTO, type MessageDTO } from "@/dto/message";
import { UnexpectedDatabaseError } from "@/errors/unexpected";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function insertOneMessage({
  sender,
  content,
}: {
  sender: InsertedMessage["sender"];
  content: InsertedMessage["content"];
}): Promise<Result<MessageDTO, UnexpectedDatabaseError | FallBackError>> {
  const sharedContext: StrictOmit<Context, "performance"> = {
    functionName: "selectAllMessages" as const,
    args: { sender, content },
    metadata: {},
  };
  const startTime = performance.now();

  try {
    const [returnedMessage] = await db
      .insert(messageTable)
      .values({ sender, content })
      .returning();

    // returnedMessage should never be undefined. Type assertion exists to make TypeScript happy.
    const messageDTO = createMessageDTO(returnedMessage as SelectedMessage);

    const endTime = performance.now();
    return {
      success: true,
      value: messageDTO,
      context: {
        ...sharedContext,
        performance: {
          startTime,
          endTime,
          duration: endTime - startTime,
        },
      },
    };
  } catch (thrownError) {
    const endTime = performance.now();

    let error: UnexpectedDatabaseError | FallBackError;
    if (thrownError instanceof SQLiteError) {
      error = new UnexpectedDatabaseError({ cause: thrownError });
    } else {
      error = createFallbackError({ cause: thrownError });
    }

    return {
      success: false,
      error,
      context: {
        ...sharedContext,
        performance: {
          startTime,
          endTime,
          duration: endTime - startTime,
        },
      },
    };
  }
}
