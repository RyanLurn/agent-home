import { BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR", Error> {
  constructor({ message, cause }: { message?: string; cause: Error }) {
    super({
      name: "UnexpectedError",
      message: message ?? cause.message,
      code: "UNEXPECTED_ERROR",
      cause,
    });
  }
}
