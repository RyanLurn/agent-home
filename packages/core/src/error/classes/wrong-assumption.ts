import { type BaseContext, BaseError } from "@/error/classes/base";

export class WrongAssumptionError extends BaseError<
  "WRONG_ASSUMPTION_ERROR",
  BaseContext,
  null
> {
  constructor({ message, context }: { message: string; context: BaseContext }) {
    super({
      name: "WrongAssumptionError",
      message,
      code: "WRONG_ASSUMPTION_ERROR",
      context,
      cause: null,
    });
  }
}
