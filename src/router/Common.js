'use strict';

/**
 * Check if valid URI path.
 *
 * @param {String} value
 *   URI path value.
 *
 * @return {Boolean}
 *
 * @example
 *   const result = isValidPath('/api/test');
 *   // true
 */
module.exports.isValidPath = function(value) {
  return /^\/([a-z0-9-_\/]+)?/.test(value);
};

/**
 * Check if valid Route/Middleware function.
 *
 * @param {Function} value
 *   Route function.
 *
 * @return {Boolean}
 *
 * @example
 *   const result = isValidFunc((req, res, next) => {});
 *   // true
 */
module.exports.isValidFunc = function(value) {
  return (typeof value === 'function' && value.length >= 1 && value.length <= 3);
};

/**
 * Check if valid Request/Route.
 *
 * @param {String} uri
 *   Request URI.
 *
 * @param {String} path
 *   Route path value.
 *
 * @return {Boolean}
 *
 * @example
 *   const result = isValidRoute('/api/test/123456', '/api/test');
 *   // true
 */
module.exports.isValidRoute = function(uri, path) {
  return (uri.match(new RegExp(`^${path}(\/[a-z0-9]+)?$`, 'i')));
};

/**
 * Set name for a given function (inline).
 *
 * @param {Function} func
 *   Route function.
 *
 * @param {Function} value
 *   Function name.
 *
 * @example
 *   const func = function() {};
 *   setFuncName(func, 'test);
 *   func.name
 *   // test
 */
module.exports.setFuncName = function(func, value) {
  Object.defineProperty(func, 'name', {value});
};
