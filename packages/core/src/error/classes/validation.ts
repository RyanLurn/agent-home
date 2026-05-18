import { prettifyError, type ZodError } from "zod";

import { BaseError } from "@/error/classes/base";

export class ValidationError extends BaseError<"VALIDATION_ERROR", ZodError> {
  constructor({ message, cause }: { message?: string; cause: ZodError }) {
    super({
      name: "ValidationError",
      code: "VALIDATION_ERROR",
      message: message ?? prettifyError(cause),
      cause,
    });
  }
}
