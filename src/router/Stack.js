/** @class router/Stack */

'use strict';

// Local
const {isValidFunc} = require('./Common');

/**
 * Provides Stack item handler and methods.
 */
module.exports = class RouterStack {

  /**
   * Create new stack instance.
   */
  constructor() {
    this.middleware = [];
    this.routes     = [];
    this.resources  = [];
    this.fallback   = null;
  }

  /**
   * Add new function to stack items.
   *
   * @param {Function} func
   *   Route/middleware function.
   */
  add(func) {
    if (isValidFunc(func)) {
      const name = func.name;

      switch (true) {
        case /^middleware/.test(name):
          this.middleware.push(func);
          break;

        case /^route:/.test(name):
          this.routes.push(func);
          break;

        case /^resource:/.test(name):
          this.resources.push(func);
          break;

        default:
          this.fallback = func;
      }
    }
  }

  /**
   * Execute stored functions (ordered by priority).
   *
   * > Middleware, Routes, Resources, fallback
   *
   * @param {RouterRequest} req
   *   Request instance.
   *
   * @param {RouterResponse} res
   *   Response instance.
   */
  exec(req, res) {
    const funcs = [].concat(this.middleware, this.routes, this.resources, [this.fallback]);

    let nextItem = false;

    funcs.forEach((func, index) => {
      if (nextItem || index === 0) {
        nextItem = false;

        func(req, res, () => {
          nextItem = true;
        });
      }
    });
  }
};
