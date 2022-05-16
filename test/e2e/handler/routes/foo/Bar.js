'use strict';

// Load modules.
const contentTypeHeader = require(`${process.cwd()}/test/e2e/handler/middleware/ContentTypeHeader`);

/**
 * @export {Object}
 */
module.exports = {
  middleware: contentTypeHeader,

  /**
   * GET /api/<path>
   */
  index (req, res) {
    res.status(200).send('foo/bar:index');
  },

  /**
   * PUT /api/<path>
   */
  create (req, res) {
    res.status(201).send('foo/bar:create');
  },

  /**
   * PATCH /api/<path>
   */
  update (req, res) {
    res.status(204).send('foo/bar:update');
  },

  /**
   * DELETE /api/<path>
   */
  delete (req, res) {
    res.status(410).send('foo/bar:delete');
  },

  /**
   * POST /api/<path>
   */
  submit (req, res) {
    res.status(200).send('foo/bar:submit');
  }
};
