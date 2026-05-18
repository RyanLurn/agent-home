import { capitalizeFirstLetter } from "@/utils/capitalize-first-letter";
import { BaseError } from "@/error/classes/base";

export class NotFoundError<TResource extends string> extends BaseError<
  "NOT_FOUND_ERROR",
  null
> {
  resource: TResource;

  constructor({
    message,
    resource,
  }: {
    message?: string;
    resource: TResource;
  }) {
    super({
      name: "NotFoundError",
      code: "NOT_FOUND_ERROR",
      message: message ?? `${capitalizeFirstLetter(resource)} not found`,
      cause: null,
    });
    this.resource = resource;
  }
}
