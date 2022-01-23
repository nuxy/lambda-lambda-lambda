'use strict';

const config = require('../config.json');

/**
 * Middleware to send Access-Control-* headers.
 */
module.exports = (req, res, next) => {
  if (config.development === true) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  }

  next();
};
