import { type BaseContext, BaseError } from "@/error/classes/base";

export class UnknownError extends BaseError<
  "UNKNOWN_ERROR",
  BaseContext,
  unknown
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: BaseContext;
    cause: unknown;
  }) {
    super({
      name: "UnknownError",
      message:
        message ?? `An unknown value of type "${typeof cause}" was thrown`,
      code: "UNKNOWN_ERROR",
      context,
      cause,
    });
  }
}
