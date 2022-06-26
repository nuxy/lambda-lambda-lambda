'use strict';

const config = require('../config.json');

/**
 * Middleware to prompt Basic Authentication.
 */
module.exports = (req, res, next) => {
  const username = config.basicAuth.username;
  const password = config.basicAuth.password;
  const authStr  = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  if (req.header('Authorization') !== authStr) {
    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};
