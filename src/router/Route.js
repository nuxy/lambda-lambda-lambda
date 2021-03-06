/** @module router/Route */

/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2022, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

// Local modules.
const {isValidFunc, setFuncName} = require('./Common');

/**
 * Handle routing operations for the given Route.
 *
 * @example
 *   // .. sam-app/src/routes/foo.js
 *   const routeConfig = {
 *     middleware: [middlewareFunc1, middlewareFunc2],
 *     resource: true || ['get', 'put', 'patch', 'submit'],
 *
 *     index  (req, res) {},
 *     get    (req, res, id) {},
 *     create (req, res) {},
 *     put    (req, res, id) {},
 *     update (req, res) {},
 *     patch  (req, res, id) {},
 *     post   (req, res) {},
 *     submit (req, res, id) {},
 *     delete (req, res) {}
 *   };
 *
 *   module.exports = routeConfig;
 */
module.exports = (router, route) => {
  let path = route.path;

  const methodMap = {
    index: 'get',
    create: 'put',
    update: 'patch',
    delete: 'delete',
    submit: 'post'
  };

  const isResource = !!route.resource;

  // Add route-bound middleware, if available.
  if (route.middleware) {
    if (Array.isArray(route.middleware)) {
      route.middleware.forEach(func => router.use(path, func));
    } else {
      router.use(path, route.middleware);
    }
  }

  // Map Route-defined action -> Request method.
  for (let key in route) {
    const method = methodMap[key] || key;

    if (!isValidFunc(router[method]) || !isValidFunc(route[key])) {
      continue;
    }

    let routeFunc = route[key];
    let entityType = 'route';

    // Support - Boolean | Array<methodMapKey>
    if (isResource && (route.resource === true || (Array.isArray(route.resource) && route.resource.includes(key)))) {
      const resourceId = getResourceId(router.req.uri(), `${router.prefix}${path}`);

      // Add resource ID to Route as argument.
      if (resourceId) {
        const oldFunc = routeFunc;
        routeFunc = (req, res) => {
          oldFunc(req, res, resourceId);
        };

        entityType = 'resource';
      }
    }

    setFuncName(routeFunc, `${entityType}:${key}`);

    // Execute the route-defined function.
    router[method](path, routeFunc);
  }
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
 *   getResourceId('/api/test/abc123', '/api/test');
 *   // abc123
 */
function getResourceId(uri, path) {
  const fragment = uri.replace(new RegExp(`^(?:${path}(?:\/([a-z0-9-_]+))?)$`, 'i'), '$1');
  if (fragment !== uri) {
    return fragment;
  }
  return null;
}
