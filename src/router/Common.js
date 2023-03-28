/** @module router/Common */

/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Check if value is an async function.
 *
 * @param {AsyncFunction} func
 *   Async function.
 *
 * @return {Boolean}
 *
 * @example
 * const result = isAsyncFunc(async function() {}));
 * // true
 */
exports.isAsyncFunc = function(value) {
  return (value && (value[Symbol.toStringTag] === 'AsyncFunction'));
};

/**
 * Check if object is (or returns) Promise.
 *
 * @param {Object} obj
 *   Promise object.
 *
 * @return {Boolean}
 *
 * @example
 * const result = isPromise(new Promise(() => {}));
 * // true
 *
 * const result = function() {
 *   return Promise.resolve();
 * };
 * // true
 */
exports.isPromise = function(obj) {
  return (obj && (obj[Symbol.toStringTag] === 'Promise' || typeof obj.then === 'function' || /Promise/.test(obj.toString())));
};

/**
 * Check if valid URI path.
 *
 * @param {String} value
 *   URI path value.
 *
 * @return {Boolean}
 *
 * @example
 * const result = isValidPath('/api/test');
 * // true
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
 * const result = isValidFunc((req, res, next) => {});
 * // true
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
 * const result = isValidRoute('/api/test/123456', '/api/test', (req, res) => {}));
 * // true
 */
exports.isValidRoute = function(uri, path, func) {
  if (module.exports.isValidFunc(func) && !/^route:/.test(func.name)) {
    return !!uri.match(new RegExp(`^${path}(\/[a-z0-9-_]+)?$`, 'i'));
  }

  return (uri === path);
};

/**
 * Return URI fragment, if Route is a resource.
 *
 * @param {String} uri
 *   Request URI.
 *
 * @param {String} path
 *   Route path value.
 *
 * @return {String|undefined}
 *
 * @example
 * const result = getResourceId('/api/test/abc123', '/api/test');
 * // abc123
 */
exports.getResourceId = function(uri, path) {
  const fragment = uri.replace(new RegExp(`^(?:${path}(?:\/([a-z0-9-_]+))?)$`, 'i'), '$1');
  if (fragment !== uri) {
    return fragment;
  }
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
 * const func = function() {};
 * setFuncName(func, 'test');
 * func.name
 * // test
 */
exports.setFuncName = function(func, value) {
  Object.defineProperty(func, 'name', {value});
};

/**
 * Get executed module parent directory.
 *
 * @return {String}
 *
 * @example
 * const dir = moduleParent();
 * // path/to/app/parent/directory
 */
exports.moduleParent = function() {
  const moduleParents = Object.values(require.cache)
    .filter((m) => m.children.includes(module));

  return moduleParents[0]?.parent.path;
};

/**
 * Execute events; propagate variable state.
 *
 * @param {Array} promises
 *   Array of promised events.
 *
 * @return {Promise}
 *
 * @example
 *   const state = {};
 *
 *   const promises = [
 *     ()  => Promise.resolve(a),
 *     (b) => Promise.resolve(b),
 *     (c) => Promise.resolve(c),
 *
 *     ..
 *   ];
 *
 *   promiseEvents(promises)
 *     .then(obj => obj)
 *     .catch(function(err) {
 *
 *     });
 */
exports.promiseEvents = function(promises) {
  return promises.reduce(function(current, next) {
    return current.then(next);
  }, Promise.resolve([]));
};
