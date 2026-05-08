import type { BaseContext } from "@/error/classes/base";

import { UnexpectedError } from "@/error/classes/unexpected";
import { UnknownError } from "@/error/classes/unknown";

export type FallBackError = UnexpectedError | UnknownError;

export function createFallbackError({
  message,
  context,
  cause,
}: {
  message?: string;
  context: BaseContext;
  cause: unknown;
}): FallBackError {
  if (cause instanceof Error) {
    return new UnexpectedError({ message, context, cause });
  }

  return new UnknownError({
    message,
    context,
    cause,
  });
}
