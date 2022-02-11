/**
 * 是否生产环境
 */
export function isProd() {
  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
}
