'use strict';

// Load modules.
const contentTypeHeader = require('../middleware/contentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: contentTypeHeader,

  /**
   * GET /api/test
   */
  index (req, res) {
    res.status(200).send('index');
  },

  /**
   * PUT /api/test
   */
  create (req, res) {
    res.status(201).send('create');
  },

  /**
   * PATCH /api/test
   */
  update (req, res) {
    res.status(204).send('update');
  },

  /**
   * DELETE /api/test
   */
  delete (req, res) {
    res.status(410).send('delete');
  },

  /**
   * POST /api/test
   */
  submit (req, res) {
    res.status(200).send('submit');
  }
};
