import { prettifyError, type ZodError } from "zod";

import { BaseError } from "@/error/classes/base";

type ValidationContext<TSchema extends string> = {
  schema: TSchema;
  [key: string]: unknown;
};

export class ValidationError<TSchema extends string> extends BaseError<
  "VALIDATION_ERROR",
  ValidationContext<TSchema>,
  ZodError
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: ValidationContext<TSchema>;
    cause: ZodError;
  }) {
    super({
      name: "ValidationError",
      code: "VALIDATION_ERROR",
      message: message ?? prettifyError(cause),
      context,
      cause,
    });
  }
}
