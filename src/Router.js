/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// Local modules.
const Request  = require('./router/Request');
const Response = require('./router/Response');
const Route    = require('./router/Route');
const Stack    = require('./router/Stack');

const {
  isValidFunc,
  isValidPath,
  isValidRoute,
  moduleParent,
  setFuncName
} = require('./router/Common');

/**
 * Provides HTTP request/response handling.
 */
class Router {

  /**
   * @param {Object} request
   *   AWS request object.
   *
   * @param {Object|undefined} response
   *   AWS response object (optional).
   *
   * @example
   * exports.handler = (event, context, callback) => {
   *   const {request, response} = event.Records[0].cf;
   *
   *   const router = new Router(request, response);
   *
   *     ..
   *
   *   callback(null, router.response());
   * };
   */
  constructor(request, response) {
    this.req   = new Request (request);
    this.res   = new Response(response);
    this.stack = new Stack();

    this.prefix = '';
  }

  /**
   * Return the AWS response object.
   *
   * @return {Object}
   */
  response() {
    loadRoutes(this);

    this.stack.exec(this.req, this.res);

    return this.res.data();
  }

  /**
   * Handle the Route/Middleware request (add to stack).
   *
   * @param {String} path
   *   Request URI.
   *
   * @param {Function} func
   *   Route/Middleware function.
   */
  handle(path, func) {
    let uri = `${this.prefix}${path}`;

    if (isValidRoute(this.req.uri(), uri, func)) {
      if (!func.name) {
        setFuncName(func, 'route::undefined');
      }

      this.stack.add(func);
    }
  }

  /**
   * Load the Route (e.g. Middleware) handler.
   *
   * @param {Function|String} arg
   *   Route/Middleware or Request URI.
   *
   * @param {Function} func
   *   Route/Middleware function (optional).
   *
   * @example
   * router.use(function(req, res, next) {
   *   if (req.method() === 'POST') {
   *     res.status(405).send();
   *   } else {
   *     next();
   *   }
   * });
   *
   *   ..
   *
   * router.use('/api/test', function(req, res) {
   *   res.setHeader('Content-Type', 'text/html');
   *   res.status(200).send('Hello World');
   * });
   */
  use(arg, func) {

    // Route middleware handler.
    if (isValidPath(arg) && isValidFunc(func)) {
      setFuncName(func, `middleware:${arg}`);

      this.handle(arg, func);
    } else

    // General middleware.
    if (isValidFunc(arg)) {
      if (arg.length === 3 && !arg.name) {
        setFuncName(arg, 'middleware');
      }

      this.stack.add(arg);
    }
  }

  /**
   * Set URI path prefix.
   *
   * @param {String} value
   *   Request URI.
   *
   * @example
   * router.setPrefix('/api');
   */
  setPrefix(value) {
    if (isValidPath(value) && value !== '/') {
      this.prefix = value;
    }
  }

  /**
   * Set router fallback (default route).
   *
   * @param {Function} route
   *   Route function.
   *
   * @example
   * router.default(function(req, res) {
   *   res.status(404).send();
   * });
   */
  default(route) {
    if (isValidFunc(route)) {
      const func = (req, res, next) => {
        route(req, res, next);
      };

      setFuncName(func, 'fallback');

      this.use(func);
    }
  }

  /**
   * Handle HTTP GET requests.
   *
   * @param {String} path
   *   Request URI.
   *
   * @param {Function} route
   *   Route function.
   *
   * @example
   * router.get('/api/test', function(req, res) {
   *   res.setHeader('Content-Type', 'text/html');
   *   res.status(200).send('Hello World');
   * });
   */
  get(path, route) {
    if (this.req.method() === 'GET' && isValidFunc(route)) {
      this.handle(path, route);
    }
  }

  /**
   * Handle HTTP POST requests.
   *
   * @param {String} path
   *   Request URI.
   *
   * @param {Function} route
   *   Route function.
   *
   * @example
   * router.post('/api/test', function(req, res) {
   *   res.status(201).send();
   * });
   */
  post(path, route) {
    if (this.req.method() === 'POST' && isValidFunc(route)) {
      this.handle(path, route);
    }
  }

  /**
   * Handle HTTP PUT requests.
   *
   * @param {String} path
   *   Request URI.
   *
   * @param {Function} route
   *   Route function.
   *
   * @example
   * router.put('/api/test', function(req, res) {
   *   res.status(201).send();
   * });
   */
  put(path, route) {
    if (this.req.method() === 'PUT' && isValidFunc(route)) {
      this.handle(path, route);
    }
  }

  /**
   * Handle HTTP PATCH requests.
   *
   * @param {String} path
   *   Request URI.
   *
   * @param {Function} route
   *   Route function.
   *
   * @example
   * router.patch('/api/test', function(req, res) {
   *   res.status(204).send();
   * });
   */
  patch(path, route) {
    if (this.req.method() === 'PATCH' && isValidFunc(route)) {
      this.handle(path, route);
    }
  }

  /**
   * Handle HTTP DELETE requests.
   *
   * @param {String} path
   *   Request URI.
   *
   * @param {Function} route
   *   Route function.
   *
   * @example
   * router.delete('/api/test', function(req, res) {
   *   res.status(200).send();
   * });
   */
  delete(path, route) {
    if (this.req.method() === 'DELETE' && isValidFunc(route)) {
      this.handle(path, route);
    }
  }
};

/**
 * Load routes from a pre-configured directory.
 *
 * @param {Router} router
 *   Router instance.
 */
function loadRoutes(router) {
  const routeDir = moduleParent() + '/routes';

  if (fs.existsSync(routeDir)) {
    const files = getRoutes(routeDir);

    files.forEach(file => {
      file = path.relative(routeDir, file);
      const {dir, name} = path.parse(file);

      const filePath = [dir, name].join('/');
      const route = require(`${routeDir}/${filePath}`);

      route.path = (
        filePath[0] === '/' ? filePath : `/${filePath}`
      ).toLowerCase();

      Route(router, route);
    });
  }
}

/**
 * Return list of route files for a given directory.
 *
 * @param {String} dir
 *   Files directory.
 *
 * @param {Array} files
 *   List of files (optional).
 *
 * @return {Array<String>}
 */
function getRoutes(dir, files = []) {
  fs.readdirSync(dir).forEach(function(file) {
    const filePath = path.join(dir, file);

    if (fs.lstatSync(filePath).isDirectory()) {

      // Perform recursive traversal.
      getRoutes(filePath, files);
    } else if (path.extname(filePath) === '.js') {
      files.push(filePath);
    }
  });

  return files;
}

module.exports = Router;
