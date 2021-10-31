'use strict';

// Load modules.
const {isValidFunc, setFuncName} = require('./Common');

/**
 * Handle routing operations for the given Route.
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

    if (typeof router[method] !== 'function' || typeof route[key] !== 'function') {
      continue;
    }

    let entityType = 'route';

    // Add resource ID to Route as argument.
    if (isResource) {
      const resourceId = getResourceId(router.req.uri(), `${router.prefix}${path}`);

      if (!resourceId) {
        continue;
      }

      const oldFunc = route[key];
      route[key] = (req, res) => {
        oldFunc(req, res, resourceId);
      };

      entityType = 'resource';
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
  const fragment = uri.replace(new RegExp(`^(?:${path}(?:\/([a-z0-9]+))?)$`, 'i'), '$1');
  if (fragment !== uri) {
    return fragment;
  }
}
