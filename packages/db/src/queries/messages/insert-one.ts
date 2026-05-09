import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { SQLiteError } from "bun:sqlite";

import type { InsertedMessage, SelectedMessage } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function insertOneMessage(
  message: InsertedMessage
): Promise<Result<SelectedMessage, FallBackError | SQLiteError>> {
  const startContext = {
    inputs: message,
    processName: "insertOneMessage",
  };

  try {
    const [returnedMessage] = await db
      .insert(messageTable)
      .values(message)
      .returning();

    return {
      success: true,
      /**
       * returnedMessage should never be undefined.
       * Type assertion exists to make TypeScript happy.
       */
      data: returnedMessage as SelectedMessage,
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
