export type Result<TData, TError extends Error> =
  | Failure<TError>
  | Success<TData>;

export type Failure<TError extends Error> = {
  success: false;
  error: TError;
};

export type Success<TData> = { success: true; data: TData };
