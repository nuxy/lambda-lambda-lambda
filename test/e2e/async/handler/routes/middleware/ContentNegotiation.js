'use strict';

/**
 * Middleware to handle JSON content negotiation responsibilities.
 */
module.exports = (req, res, next) => {

  // Exclude non-RESTful request types.
  if (!['PUT', 'PATCH', 'DELETE'].includes(req.method())) {
    return next();
  }

  // Check client request headers.
  if (/application\/json;*./.test(req.header('Accept'))) {
    res.status(406).send();
  } else if (req.is('application/json') === false) {
    res.status(415).send();
  } else {
    next();
  }
};
