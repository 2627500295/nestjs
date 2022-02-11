import { isProd } from './is-prod';

/**
 * 是否开发环境
 */
export function isDev() {
  return !isProd();
}
