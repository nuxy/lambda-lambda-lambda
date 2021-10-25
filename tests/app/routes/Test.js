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
    res.status(200).send('index');
  },

  /**
   * PUT /api/test
   */
  create (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(201).send('create');
  },

  /**
   * PATCH /api/test
   */
  update (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(204).send('update');
  },

  /**
   * DELETE /api/test
   */
  delete (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(410).send('delete');
  },

  /**
   * SUBMIT /api/test
   */
  submit (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('submit');
  }
};
