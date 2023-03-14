'use strict';

// Load modules.
const contentNegotiation = require(`${PACKAGE_ROOT}/test/e2e/async/handler/middleware/ContentNegotiation`);

/**
 * @export {Object}
 */
module.exports = {
  middleware: [contentNegotiation],
  resource: true,

  /**
   * GET /api/<path>/<resourceId>
   */
  get (req, res, id) {
    return new Promise(function(resolve) {
      res.setHeader('X-Request-ID', id);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({get: true});
      resolve();
    });
  },

  /**
   * PUT /api/<path>/<resourceId>
   */
  put (req, res, id) {
    return new Promise(function(resolve) {
      res.setHeader('X-Request-ID', id);
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({put: true});
      resolve();
    });
  },

  /**
   * PATCH /api/<path>/<resourceId>
   */
  patch (req, res, id) {
    return new Promise(function(resolve) {
      res.setHeader('X-Request-ID', id);
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json({patch: true});
      resolve();
    });
  },

  /**
   * DELETE /api/<path>/<resourceId>
   */
  delete (req, res, id) {
    return new Promise(function(resolve) {
      res.setHeader('X-Request-ID', id);
      res.setHeader('Content-Type', 'application/json');
      res.status(410).json({delete: true});
      resolve();
    });
  },

  /**
   * POST /api/<path>/<resourceId>
   */
  post (req, res, id) {
    return new Promise(function(resolve) {
      res.setHeader('X-Request-ID', id);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({post: true});
      resolve();
    });
  }
};
