import { UnexpectedError } from "@/error/classes/unexpected";
import { UnknownError } from "@/error/classes/unknown";

export type FallBackError = UnexpectedError | UnknownError;

export function createFallbackError({
  message,
  cause,
}: {
  message?: string;
  cause: unknown;
}): FallBackError {
  if (cause instanceof Error) {
    return new UnexpectedError({ message, cause });
  }

  return new UnknownError({
    message,
    cause,
  });
}
