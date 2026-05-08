import { type BaseContext, BaseError } from "@/error/classes/base";

export class UnexpectedError extends BaseError<
  "UNEXPECTED_ERROR",
  BaseContext,
  Error
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: BaseContext;
    cause: Error;
  }) {
    super({
      name: "UnexpectedError",
      message: message ?? cause.message,
      code: "UNEXPECTED_ERROR",
      context,
      cause,
    });
  }
}
