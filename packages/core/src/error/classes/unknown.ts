import { BaseError } from "@/error/classes/base";

export class UnknownError extends BaseError<"UNKNOWN_ERROR", unknown> {
  constructor({ message, cause }: { message?: string; cause: unknown }) {
    super({
      name: "UnknownError",
      message:
        message ?? `An unknown value of type "${typeof cause}" was thrown`,
      code: "UNKNOWN_ERROR",
      cause,
    });
  }
}
