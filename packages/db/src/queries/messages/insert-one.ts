import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { SQLiteError } from "bun:sqlite";

import type { InsertedMessage, SelectedMessage, Message } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function insertOneMessage({
  sender,
  content,
}: Pick<InsertedMessage, "content" | "sender">): Promise<
  Result<Message, FallBackError | SQLiteError>
> {
  const startContext = {
    inputs: { sender, content },
    processName: "insertOneMessage",
  };

  try {
    const [returnedMessage] = await db
      .insert(messageTable)
      .values({ sender, content })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { deletedAt, ...message } = returnedMessage as SelectedMessage; // returnedMessage should never be undefined. Type assertion exists to make TypeScript happy.

    return {
      success: true,
      data: message,
    };
  } catch (error) {
    if (error instanceof SQLiteError) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: createFallbackError({
        message:
          "Failed to insert message into the database due to an unexpected error",
        context: startContext,
        cause: error,
      }),
    };
  }
}
