'use strict';

/**
 * Middleware to send Content-Type header.
 */
module.exports = (req, res, next) => {

  // Skip headers on empty response.
  const json = res.json;
  res.json = function(data) {
    if (data) {
      res.setHeader('Content-Type', 'application/json');
    }

    return json.call(this, data);
  };

  const text = res.text;
  res.text = function(body) {
    if (body) {
      res.setHeader('Content-Type', 'text/html');
    }

    return text.call(this, body);
  };

  next();
};
