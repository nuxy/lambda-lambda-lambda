'use strict';

// Load modules.
const contentNegotiation = require(`${process.cwd()}/tests/handler/middleware/ContentNegotiation`);
const contentTypeHeader  = require(`${process.cwd()}/tests/handler/middleware/ContentTypeHeader`);

/**
 * @export {Object}
 */
module.exports = {
  middleware: [contentNegotiation, contentTypeHeader],
  resourceId: 'id',

  /**
   * GET /api/<path>
   */
  index (req, res) {
    res.status(200).json({index: true});
  },

  /**
   * PUT /api/<path>
   */
  create (req, res) {
    res.status(201).json({create: true});
  },

  /**
   * PATCH /api/<path>
   */
  update (req, res) {
    res.status(204).json({update: true});
  },

  /**
   * DELETE /api/<path>
   */
  delete (req, res) {
    res.status(410).json({delete: true});
  },

  /**
   * POST /api/<path>
   */
  submit (req, res) {
    res.status(200).json({submit: true});
  }
};
