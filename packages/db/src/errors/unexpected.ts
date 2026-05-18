import type { SQLiteError } from "bun:sqlite";

import { BaseError } from "@repo/core/error/classes/base";

export class UnexpectedDatabaseError extends BaseError<
  "UNEXPECTED_DATABASE_ERROR",
  SQLiteError
> {
  constructor({ message, cause }: { message?: string; cause: SQLiteError }) {
    super({
      name: "UnexpectedDatabaseError",
      message: message ?? cause.message,
      code: "UNEXPECTED_DATABASE_ERROR",
      cause,
    });
  }
}
