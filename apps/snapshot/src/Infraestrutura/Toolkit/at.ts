export function at<T>(arr: T[], n: number): T | undefined {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0;

  // Allow negative indexing from the end
  if (n < 0) n += arr.length;

  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= arr.length) return undefined;

  // Otherwise, this is just normal property access
  return arr[n];
}
