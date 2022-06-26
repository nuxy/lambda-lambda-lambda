'use strict';

const contentTypeHeader = require('../middleware/ContentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: contentTypeHeader,
  resource: ['create', 'update', 'delete'],

  /**
   * GET /api/example
   */
  index (req, res) {
    res.status(200).send('index');
  },

  /**
   * PUT /api/example/<resourceId>
   */
  create (req, res, id) {
    res.status(201).send('create');
  },

  /**
   * PATCH /api/example/<resourceId>
   */
  update (req, res, id) {
    res.status(204).send('update');
  },

  /**
   * DELETE /api/example/<resourceId>
   */
  delete (req, res, id) {
    res.status(410).send('delete');
  },

  /**
   * POST /api/example
   */
  submit (req, res) {
    res.status(200).send('submit');
  }
};
