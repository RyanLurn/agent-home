export type Context<
  TArgs extends Array<unknown>,
  TFunctionName extends string,
> = {
  args: TArgs;
  functionName: TFunctionName;
  performance: {
    startTime: number;
    endTime: number;
    duration: number;
  };
  [key: string]: unknown;
};

export type Failure<
  TError extends Error,
  TArgs extends Array<unknown>,
  TFunctionName extends string,
> = {
  success: false;
  error: TError;
  context: Context<TArgs, TFunctionName>;
};

export type Success<
  TValue,
  TArgs extends Array<unknown>,
  TFunctionName extends string,
> = {
  success: true;
  value: TValue;
  context: Context<TArgs, TFunctionName>;
};

export type Result<
  TValue,
  TError extends Error,
  TArgs extends Array<unknown>,
  TFunctionName extends string,
> =
  | Success<TValue, TArgs, TFunctionName>
  | Failure<TError, TArgs, TFunctionName>;
