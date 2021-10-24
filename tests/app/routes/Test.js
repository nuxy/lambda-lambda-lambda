'use strict';

/**
 * @export {Object}
 */
module.exports = {

  /**
   * GET /api/test
   */
  index (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Hello World');
  },

  /**
   * PUT /api/test
   */
  create (req, res) {
    res.status(201).send();
  },

  /**
   * PATCH /api/test
   */
  edit (req, res) {
    res.status(204).send();
  },

  /**
   * DELETE /api/test
   */
  delete (req, res) {
    res.status(200).send();
  },
};
