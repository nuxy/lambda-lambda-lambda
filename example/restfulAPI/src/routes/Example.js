'use strict';

const contentTypeHeader = require('../middleware/ContentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: contentTypeHeader,

  /**
   * GET /api/example
   */
  index (req, res) {
    res.status(200).send('index');
  },

  /**
   * PUT /api/example
   */
  create (req, res) {
    res.status(201).send('create');
  },

  /**
   * PATCH /api/example
   */
  update (req, res) {
    res.status(204).send('update');
  },

  /**
   * DELETE /api/example
   */
  delete (req, res) {
    res.status(410).send('delete');
  },

  /**
   * POST /api/example
   */
  submit (req, res) {
    res.status(200).send('submit');
  }
};
