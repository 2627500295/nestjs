/**
 * pick
 *
 * @param {*} obj - 对象
 * @param {*} props - 要取那些属性
 */
import { pickBy } from './pick-by';

export function pick(obj, props) {
  return pickBy(obj, props, (value, key) => key in obj);
}
