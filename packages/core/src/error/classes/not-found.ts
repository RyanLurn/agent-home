import { capitalizeFirstLetter } from "@/utils/capitalize-first-letter";
import { BaseError } from "@/error/classes/base";

type NotFoundContext<TResource extends string> = {
  resource: TResource;
  [key: string]: unknown;
};

export class NotFoundError<TResource extends string> extends BaseError<
  "NOT_FOUND_ERROR",
  NotFoundContext<TResource>,
  null
> {
  constructor({
    message,
    context,
  }: {
    message?: string;
    context: NotFoundContext<TResource>;
  }) {
    super({
      name: "NotFoundError",
      code: "NOT_FOUND_ERROR",
      message:
        message ?? `${capitalizeFirstLetter(context.resource)} not found`,
      context,
      cause: null,
    });
  }
}
