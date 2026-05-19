import type { Context, Result } from "@repo/core/types/result";
import type { StrictOmit } from "@repo/core/types/strict-omit";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { SQLiteError } from "bun:sqlite";
import { isNull } from "drizzle-orm";

import { createMessageDTO, type MessageDTO } from "@/dto/message";
import { UnexpectedDatabaseError } from "@/errors/unexpected";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function selectAllMessages(): Promise<
  Result<MessageDTO[], UnexpectedDatabaseError | FallBackError>
> {
  const sharedContext: StrictOmit<Context, "performance"> = {
    functionName: "selectAllMessages" as const,
    args: {},
    metadata: {},
  };
  const startTime = performance.now();

  try {
    const selectedMessages = await db
      .select()
      .from(messageTable)
      .where(isNull(messageTable.deletedAt));

    const messageDTOArray = selectedMessages.map((message) =>
      createMessageDTO(message)
    );

    const endTime = performance.now();
    return {
      success: true,
      value: messageDTOArray,
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
