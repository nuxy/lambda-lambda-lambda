'use strict';

/**
 * Middleware to send Content-Type header.
 */
module.exports = (req, res, next) => {

  // Skip headers on empty response.
  const text = res.text;
  res.text = function(body) {
    if (body) {
      res.setHeader('Content-Type', 'text/html');
    }

    return text.call(this, body);
  };

  next();
};
