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
    res.status(200).send('example:index');
  },

  /**
   * PUT /api/example/<resourceId>
   */
  create (req, res, id) {
    res.status(201).send(`example/${id}:create`);
  },

  /**
   * PATCH /api/example/<resourceId>
   */
  update (req, res, id) {
    res.status(204).send(`example/${id}:update`);
  },

  /**
   * DELETE /api/example/<resourceId>
   */
  delete (req, res, id) {
    res.status(410).send(`example/${id}:delete`);
  },

  /**
   * POST /api/example
   */
  submit (req, res) {
    res.status(200).send('example:submit');
  }
};
