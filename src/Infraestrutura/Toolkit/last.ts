/**
 * 取数组最后一位
 * @param arr - 数组
 */
export function last<T>(arr: T[]) {
  return Array.isArray(arr) && arr.length ? arr[arr.length - 1] : undefined;
}
