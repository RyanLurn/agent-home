export type Context<
  TArgs extends Array<unknown>,
  TFunctionName extends string,
  TMetadata extends Record<string, unknown> | null = null,
> = {
  args: TArgs;
  functionName: TFunctionName;
  performance: {
    startTime: number;
    endTime: number;
    duration: number;
  };
  metadata: TMetadata;
};

export type Failure<
  TError extends Error,
  TArgs extends Array<unknown>,
  TFunctionName extends string,
  TMetadata extends Record<string, unknown> | null = null,
> = {
  success: false;
  error: TError;
  context: Context<TArgs, TFunctionName, TMetadata>;
};

export type Success<
  TValue,
  TArgs extends Array<unknown>,
  TFunctionName extends string,
  TMetadata extends Record<string, unknown> | null = null,
> = {
  success: true;
  value: TValue;
  context: Context<TArgs, TFunctionName, TMetadata>;
};

export type Result<
  TValue,
  TError extends Error,
  TArgs extends Array<unknown>,
  TFunctionName extends string,
  TMetadata extends Record<string, unknown> | null = null,
> =
  | Success<TValue, TArgs, TFunctionName, TMetadata>
  | Failure<TError, TArgs, TFunctionName, TMetadata>;
