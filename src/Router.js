'use strict';

const fs      = require('fs');
const glob    = require('glob');
const {parse} = require('path');

// Load modules.
const Request  = require('./router/Request');
const Response = require('./router/Response');
const Route    = require('./router/Route');

/**
 * Provides HTTP request/response handling.
 */
module.exports = class Router {

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
    this.req = new Request (request);
    this.res = new Response(response);

    this.prefix = '';
    this.stack  = [];
    this.match  = false;
  }

  /**
   * Return the AWS response object.
   *
   * @return {Object}
   */
  response() {
    this.loadRoutes();

    // Re-order stack (middleware first).
    this.stack.sort(function(a, b) {
      return (a.length === 3) ? -1 : 1;
    });

    let nextStack = false;

    // Execute stack functions.
    this.stack.forEach((func, index) => {
      if (nextStack || index === 0) {
         nextStack = false;

        func(this.req, this.res, () => {
          nextStack = true;
        });
      }
    });

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

    if (this.req.uri().match(new RegExp(`^${uri}(\/[a-z0-9]+)?$`, 'i')) && Router.isValidFunc(func)) {
      this.stack.push(func);
      this.match = true;
    }
  }

  /**
   * Load the Route/Middleware handler.
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
    if (Router.isValidPath(arg) && Router.isValidFunc(func)) {
      this.handle(arg, func);
    }

    if (Router.isValidFunc(arg)) {
      this.stack.push(arg);
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
    if (Router.isValidPath(value)) {
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
    this.use((req, res, next) => {

      // Check at runtime.
      if (this.match === false) {
        route(req, res, next);
      }

      next();
    });
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

  /**
   * Load configured routes.
   */
  loadRoutes() {
    const routeDir = `${module.parent.path}/routes`;

    if (fs.existsSync(routeDir)) {
      const files = glob.sync('**/*.js', {cwd: routeDir});

      files.forEach(file => {
        const {dir, name} = parse(file);

        const filePath = [dir, name].join('/');
        const route = require(`${routeDir}/${filePath}`);

        route.path = (
          filePath[0] === '/' ? filePath : `/${filePath}`
        ).toLowerCase();

        Route(this, route);
      });
    }
  }

  /**
   * Check if valid URI path.
   *
   * @param {String} value
   *   URI path value.
   *
   * @return {Boolean}
   */
  static isValidPath(value) {
    return /^\/([a-z0-9-_\/]+)?/.test(value);
  }

  /**
   * Check if valid Route/Middleware function.
   *
   * @param {Function} value
   *   Route function.
   *
   * @return {Boolean}
   */
  static isValidFunc(value) {
    return (typeof value === 'function' && value.length >= 1 && value.length <= 3);
  }
};
