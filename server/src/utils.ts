/**
 * If the given error is an instance of Error, call the callback with the error.
 * Intended to be used in catch blocks.
 * @param error The error to check
 * @param callback The callback to call if the error is an instance of Error
 * @returns The return value of the callback, or undefined if the error is not an instance of Error
 */
export const ifIsError = <T>(
  error: unknown,
  callback: (error: Error) => T
): T | undefined => {
  if (error instanceof Error) {
    return callback(error);
  }
};
