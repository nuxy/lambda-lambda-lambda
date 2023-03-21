/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

// Local modules.
const {isAsyncFunc, isPromise, isValidFunc, promiseEvents} = require('./Common');

/**
 * Provides Stack item handler and methods.
 */
class RouterStack {

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
   * Stack function types
   *  - middleware
   *  - route:&lt;method&gt;
   *  - resource:&lt;method&gt;
   *  - fallback
   *
   * @param {Function} func
   *   Route/middleware function.
   *
   * @example
   * const func1 = function(req, res, next) {
   *   if (req.method() === 'POST') {
   *     res.status(405).send();
   *   } else {
   *     next();
   *   }
   * };
   *
   * setFuncName(func1, 'middleware');
   * stack.add(func1);
   *
   *   ..
   *
   * const func2 = function(req, res) {
   *   res.setHeader('Content-Type', 'text/html');
   *   res.status(200).send('Hello World');
   * };
   *
   * setFuncName(func2, 'route:get');
   * stack.add(func2);
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
   * Execute stored functions (a)synchronously.
   *
   * Order by priority.
   * > Middleware, Routes, Resources, fallback
   *
   * @param {RouterRequest} req
   *   Request instance.
   *
   * @param {RouterResponse} res
   *   Response instance.
   *
   * @return {Promise|undefined}
   *
   * @example
   * stack.exec(req, res);
   *
   * // updated instance
   * res.data();
   *
   *   ..
   *
   * stack.exec(req, res)
   *   .then(() => res.data())
   */
  exec(req, res) {
    const funcs = [].concat(this.middleware, this.routes, this.resources, [this.fallback]);

    let lastItem = true;
    let nextItem = true;
    let promises = [];

    funcs.forEach((func, index) => {
      if (nextItem) {
        lastItem = index++ === funcs.length;
        nextItem = false;

        if (isAsyncFunc(func) || isPromise(func)) {

          // Asynchronous handling.
          promises.push(() => {
            return func(req, res, function() {
              throw new Error('Middleware next() is unsupported in async');
            });
          });

          nextItem = !lastItem;

        } else if (isValidFunc(func)) {

          // Synchronous handling.
          func(req, res, () => nextItem = !lastItem);
        }
      }
    });

    if (promises.length) {
      return promiseEvents(promises);
    }
  }
};

module.exports = RouterStack;
