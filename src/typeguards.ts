export function isFailed<T>(value: Failable<T>): value is Failed {
  return !!(value as Failed).error;
}
