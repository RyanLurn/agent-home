export type BaseContext = Record<string, unknown> | null;

export class BaseError<
  TCode extends string,
  TContext extends BaseContext = BaseContext,
  TCause = unknown,
> extends Error {
  code: TCode;
  context: TContext;
  declare cause: TCause;

  constructor({
    name,
    message,
    code,
    context,
    cause,
  }: {
    name: string;
    message: string;
    code: TCode;
    context: TContext;
    cause: TCause;
  }) {
    super(message, { cause });
    this.name = name;
    this.code = code;
    this.context = context;
  }
}
