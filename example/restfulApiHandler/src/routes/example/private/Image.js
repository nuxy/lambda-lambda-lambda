'use strict';

const basicAuthHandler = require('../../../middleware/BasicAuthHandler');

const fs = require('fs');

/**
 * @export {Object}
 */
module.exports = {
  middleware: [basicAuthHandler],

  /**
   * GET /api/example/private/image
   */
  index (req, res) {
    const buffer = fs.readFileSync(`${__dirname}/../../../../package.png`);

    if (buffer) {

      // Return success response.
      res.setHeader('Content-Type', 'image/png; charset=utf-8');
      res.status(200).send(buffer);
    } else {

      // Return error response.
      res.status(404).send();
    }
  }
};
