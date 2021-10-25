'use strict';

/**
 * Handle routing operations for the given Route.
 */
module.exports = (router, route) => {

  // Add route-bound middleware, if available.
  if (route.middleware) {
    if (Array.isArray(route.middleware)) {
      route.middleware.forEach(func => router.use(route.path, func));
    } else {
      router.use(route.path, route.middleware);
    }
  }

  const methods = {
    index: 'get',
    create: 'put',
    update: 'patch',
    delete: 'delete',
    submit: 'post'
  };

  for (let key in route) {
    const method = methods[key] || key;

    // Execute the route-defined function.
    if (typeof router[method] === 'function') {
      router[method](route.path, route[key]);
    }
  }
};
