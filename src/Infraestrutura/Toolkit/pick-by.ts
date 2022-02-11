/**
 * pickBy
 *
 * @param {object} obj - 对象
 * @param {array} props - 要取那些属性
 * @param {function} predicate - 回调
 * @returns {object}
 */
export function pickBy(obj, props, predicate) {
  return props.reduce((acc, key) => {
    predicate(obj[key], key) && (acc[key] = obj[key]);
    return acc;
  }, {});
}
