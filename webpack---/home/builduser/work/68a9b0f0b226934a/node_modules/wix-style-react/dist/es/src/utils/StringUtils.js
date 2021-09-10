export var isString = function isString(a) {
  return typeof a === 'string';
};
/**
 * a includes b (with case insensitive matching)
 */

export function includesCaseInsensitive() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return [a, b].every(isString) && (!b || a.toLowerCase().indexOf(b.toLowerCase()) !== -1);
}
export var StringUtils = {
  includesCaseInsensitive: includesCaseInsensitive
};