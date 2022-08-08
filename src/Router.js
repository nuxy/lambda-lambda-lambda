/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2022, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

const fs      = require('fs');
const glob    = require('glob');
const {parse} = require('path');

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
   *   exports.handler = (event, context, callback) => {
   *     const {request, response} = event.Records[0].cf;
   *
   *     const router = new Router(request, response);
   *
   *       ..
   *
   *     callback(null, router.response());
   *   };
   */
  constructor(request, response) {
    this.req   = new Request (request);
    this.res   = new Response(response);
    this.stack = new Stack();

    this.prefix = '';
    this.match  = false;
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
   *   router.use(function(req, res, next) {
   *     if (req.method() === 'POST') {
   *       res.status(405).send();
   *     } else {
   *       next();
   *     }
   *   });
   *
   *     ..
   *
   *   router.use('/api/test', function(req, res) {
   *     res.setHeader('Content-Type', 'text/html');
   *     res.status(200).send('Hello World');
   *   });
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
   *   router.setPrefix('/api');
   */
  setPrefix(value) {
    if (isValidPath(value)) {
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
   *   router.default(function(req, res) {
   *     res.status(404).send();
   *   });
   */
  default(route) {
    const func = (req, res, next) => {
      route(req, res, next);
    };

    setFuncName(func, 'fallback');

    this.use(func);
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
   *   router.get('/api/test', function(req, res) {
   *     res.setHeader('Content-Type', 'text/html');
   *     res.status(200).send('Hello World');
   *   });
   */
  get(path, route) {
    if (this.req.method() === 'GET') {
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
   *   router.post('/api/test', function(req, res) {
   *     res.status(201).send();
   *   });
   */
  post(path, route) {
    if (this.req.method() === 'POST') {
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
   *   router.put('/api/test', function(req, res) {
   *     res.status(201).send();
   *   });
   */
  put(path, route) {
    if (this.req.method() === 'PUT') {
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
   *   router.patch('/api/test', function(req, res) {
   *     res.status(204).send();
   *   });
   */
  patch(path, route) {
    if (this.req.method() === 'PATCH') {
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
   *   router.delete('/api/test', function(req, res) {
   *     res.status(200).send();
   *   });
   */
  delete(path, route) {
    if (this.req.method() === 'DELETE') {
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
    const files = glob.sync('**/*.js', {cwd: routeDir});

    files.forEach(file => {
      const {dir, name} = parse(file);

      const filePath = [dir, name].join('/');
      const route = require(`${routeDir}/${filePath}`);

      route.path = (
        filePath[0] === '/' ? filePath : `/${filePath}`
      ).toLowerCase();

      Route(router, route);
    });
  }
}

module.exports = Router;
