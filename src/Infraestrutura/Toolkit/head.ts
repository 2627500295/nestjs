/**
 * 取数组第一位
 * @param arr - 数组
 */
export function head<T>(arr: T[]) {
  return Array.isArray(arr) && arr.length ? arr[0] : undefined;
}
