/** @module router/Route */

'use strict';

// Load modules.
const {isValidFunc, setFuncName} = require('./Common');

/**
 * Handle routing operations for the given Route.
 *
 * @example
 *   // .. sam-app/src/routes/foo.js
 *   const routeConfig = {
 *     middleware: [middlewareFunc1, middlewareFunc2],
 *     resource:   true || ['index'],
 *
 *     index  (req, res, id) {},
 *     create (req, res) {},
 *     update (req, res) {},
 *     delete (req, res) {},
 *     submit (req, res) {}
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

    let entityType = 'route';

    // Add resource ID to Route as argument.
    if (isResource) {
      const resourceId = getResourceId(router.req.uri(), `${router.prefix}${path}`);

      const v = route.resource;

      // Support - Boolean | Array<methodMapKey>
      if (resourceId && (v === true || (Array.isArray(v) && v.includes(key)))) {
        const oldFunc = route[key];
        route[key] = (req, res) => {
          oldFunc(req, res, resourceId);
        };

        entityType = 'resource';
      }
    }

    setFuncName(route[key], `${entityType}:${key}`);

    // Execute the route-defined function.
    router[method](path, route[key]);
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
 *   router.resourceId('/api/test/abc123', '/api/test');
 *   // abc123
 */
function getResourceId(uri, path) {
  const fragment = uri.replace(new RegExp(`^(?:${path}(?:\/([a-z0-9-_]+))?)$`, 'i'), '$1');
  if (fragment !== uri) {
    return fragment;
  }
}
