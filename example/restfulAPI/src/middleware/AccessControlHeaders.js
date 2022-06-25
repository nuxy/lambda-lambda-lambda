'use strict';

const config = require('../config.json');

/**
 * Middleware to send Access-Control-* headers.
 */
module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');

  // Set CORS restrictions.
  res.setHeader('Access-Control-Allow-Origin',
    (config.development === true) ? config.origin.devUrl : config.origin.siteUrl
  );

  // Handle preflight requests.
  if (req.method() === 'OPTIONS') {
    res.status(204).send();
  } else {
    next();
  }
};
