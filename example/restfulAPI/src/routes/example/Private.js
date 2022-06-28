'use strict';

const basicAuthHandler  = require('../../middleware/BasicAuthHandler');
const contentTypeHeader = require('../../middleware/ContentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: [basicAuthHandler, contentTypeHeader],
  resource: ['create', 'update', 'delete'],

  /**
   * GET /api/example/private
   */
  index (req, res) {
    res.status(200).send('example/private:index');
  },

  /**
   * PUT /api/example/private/<resourceId>
   */
  create (req, res, id) {
    res.status(201).send(`example/private/${id}:create`);
  },

  /**
   * PATCH /api/example/private/<resourceId>
   */
  update (req, res, id) {
    res.status(204).send(`example/private/${id}:update`);
  },

  /**
   * DELETE /api/example/private/<resourceId>
   */
  delete (req, res, id) {
    res.status(410).send(`example/private/${id}:delete`);
  },

  /**
   * POST /api/example/private
   */
  submit (req, res) {
    res.status(200).send('example/private:submit');
  }
};
