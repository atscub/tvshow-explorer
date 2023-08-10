export function isFailed<T>(value: Failable<T>): value is Failed {
  return typeof value == "object" && !!(value as Failed).error;
}
