const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * 取数组指定index的值
 *
 * @param arr - 数组
 * @param n - 下标
 *
 * @returns {*}
 */
export function nth<T>(arr: T[], n: number): T | undefined {
  if (Array.isArray(arr) && arr.length && n >= 0 && n < MAX_SAFE_INTEGER && arr.length > n) {
    return arr[n];
  }

  return undefined;
}
