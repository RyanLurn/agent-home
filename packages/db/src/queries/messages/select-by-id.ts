import type { Context, Result } from "@repo/core/types/result";
import type { StrictOmit } from "@repo/core/types/strict-omit";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { NotFoundError } from "@repo/core/error/classes/not-found";
import { isNull, and, eq } from "drizzle-orm";
import { SQLiteError } from "bun:sqlite";

import type { SelectedMessage } from "@/types";

import { createMessageDTO, type MessageDTO } from "@/dto/message";
import { UnexpectedDatabaseError } from "@/errors/unexpected";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function selectMessageById({
  id,
}: {
  id: SelectedMessage["id"];
}): Promise<
  Result<
    MessageDTO,
    NotFoundError<"messages"> | UnexpectedDatabaseError | FallBackError
  >
> {
  const sharedContext: StrictOmit<Context, "performance"> = {
    functionName: "selectMessageById" as const,
    args: { id },
    metadata: {},
  };
  const startTime = performance.now();

  try {
    const [selectedMessage] = await db
      .select()
      .from(messageTable)
      .where(and(eq(messageTable.id, id), isNull(messageTable.deletedAt)));

    if (selectedMessage) {
      const messageDTO = createMessageDTO(selectedMessage);

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
    }

    const endTime = performance.now();
    return {
      success: false,
      error: new NotFoundError<"messages">({ resource: "messages" }),
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
