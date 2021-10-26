'use strict';

// Load modules.
const contentTypeHeader = require(`${process.cwd()}/tests/handler/middleware/contentTypeHeader`);

/**
 * @export {Object}
 */
module.exports = {
  middleware: contentTypeHeader,

  /**
   * GET /api/<path>
   */
  index (req, res) {
    res.status(200).send('index');
  },

  /**
   * PUT /api/<path>
   */
  create (req, res) {
    res.status(201).send('create');
  },

  /**
   * PATCH /api/<path>
   */
  update (req, res) {
    res.status(204).send('update');
  },

  /**
   * DELETE /api/<path>
   */
  delete (req, res) {
    res.status(410).send('delete');
  },

  /**
   * POST /api/<path>
   */
  submit (req, res) {
    res.status(200).send('submit');
  }
};
