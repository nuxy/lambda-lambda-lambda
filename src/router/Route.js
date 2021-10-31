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

  const isResource = !!route.resourceId;

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

    // Add resource ID to Route as argument.
    const method = methodMap[key] || key;

    if (isValidFunc(route[key])) {
      if (isResource) {
        setFuncName(route[key], 'resource');
      } else {
        setFuncName(route[key], 'route');
      }
    }

    // Execute the route-defined function.
    if (typeof router[method] === 'function') {
      router[method](path, route[key]);
    }
  }
};

/**
 * Return the last URI fragment.
 *
 * @param {String} path
 *   Request URI.
 *
 * @return {String}
 */
function getUriFragment(path) {
  return path && path.substring(path.lastIndexOf('/') + 1);
}
