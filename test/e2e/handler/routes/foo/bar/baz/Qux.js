'use strict';

// Load modules.
const contentNegotiation = require(`${process.cwd()}/test/e2e/handler/middleware/ContentNegotiation`);
const contentTypeHeader  = require(`${process.cwd()}/test/e2e/handler/middleware/ContentTypeHeader`);

/**
 * @export {Object}
 */
module.exports = {
  middleware: [contentNegotiation, contentTypeHeader],
  resource: ['get', 'put', 'patch', 'delete', 'post'],

  /**
   * GET /api/<path>
   */
  index (req, res) {
    res.status(200).json({index: true});
  },

  /**
   * GET /api/<path>/<resourceId>
   */
  get (req, res, id) {
    res.setHeader('X-Request-ID', id);
    res.status(200).json({get: true});
  },

  /**
   * PUT /api/<path>
   */
  create (req, res) {
    res.status(201).json({create: true});
  },

  /**
   * PUT /api/<path>/<resourceId>
   */
  put (req, res, id) {
    res.setHeader('X-Request-ID', id);
    res.status(201).json({put: true});
  },

  /**
   * PATCH /api/<path>
   */
  update (req, res) {
    res.status(204).json({update: true});
  },

  /**
   * PATCH /api/<path>/<resourceId>
   */
  patch (req, res, id) {
    res.setHeader('X-Request-ID', id);
    res.status(204).json({patch: true});
  },

  /**
   * DELETE /api/<path>/<resourceId>
   */
  delete (req, res, id) {
    res.setHeader('X-Request-ID', id);
    res.status(410).json({delete: true});
  },

  /**
   * POST /api/<path>
   */
  submit (req, res) {
    res.status(200).json({submit: true});
  },

  /**
   * POST /api/<path>/<resourceId>
   */
  post (req, res, id) {
    res.setHeader('X-Request-ID', id);
    res.status(200).json({post: true});
  }
};
