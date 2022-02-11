import { isProd } from './is-prod';

/**
 * 线上
 */
export function isOnline() {
  return isProd() && (!process.env.CHANNEL || process.env.CHANNEL === 'online');
}
