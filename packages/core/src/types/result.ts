export type Context = {
  functionName: string;
  args: Record<string, unknown>;
  metadata: Record<string, unknown>;
  performance: {
    startTime: number;
    endTime: number;
    duration: number;
  };
};

export type Failure<TError extends Error> = {
  success: false;
  error: TError;
  context: Context;
};

export type Success<TValue> = {
  success: true;
  value: TValue;
  context: Context;
};

export type Result<TValue, TError extends Error> =
  | Success<TValue>
  | Failure<TError>;
