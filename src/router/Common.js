/** @module router/Common */

/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2022, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

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
exports.isValidPath = function(value) {
  return /^\/([a-z0-9-_\/]+)?$/.test(value);
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
exports.isValidFunc = function(value) {
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
 * @param {Function} func
 *   Route function.
 *
 * @return {Boolean}
 *
 * @example
 *   const result = isValidRoute('/api/test/123456', '/api/test', (req, res) => {}));
 *   // true
 */
exports.isValidRoute = function(uri, path, func) {
  if (module.exports.isValidFunc(func) && !/^route:/.test(func.name)) {
    return !!uri.match(new RegExp(`^${path}(\/[a-z0-9-_]+)?$`, 'i'));
  }

  return (uri === path);
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
exports.setFuncName = function(func, value) {
  Object.defineProperty(func, 'name', {value});
};

/**
 * Get executed module parent directory.
 *
 * @return {String|null}
 *
 * @example
 *   const dir = moduleParent();
 */
exports.moduleParent = function() {
  const moduleParents = Object.values(require.cache)
    .filter((m) => m.children.includes(module));

  return (moduleParents[0].parent) ? moduleParents[0].parent.path : null;
};
