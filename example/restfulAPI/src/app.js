'use strict';

const Router = require('lambda-lambda-lambda');
const config = require('./config.json');

const accessControlHeaders = require(`./middleware/AccessControlHeaders`);

/**
 * @see AWS::Serverless::Function
 */
exports.handler = (event, context, callback) => {
  const {request, response} = event.Records[0].cf;

  const router = new Router(request, response);
  router.setPrefix(config.router.prefix);

  // Middleware (order is important).
  router.use(function(req, res, next) {
    if (req.method() === 'CONNECT') {
      res.status(405).send();
    } else {
      next();
    }
  });

  // Preflight OPTIONS.
  router.use(function(req, res, next) {
    if (req.method() === 'OPTIONS') {
      accessControlHeaders(req, res, next);

      res.status(200).send();
    } else {
      next();
    }
  });

  // Send root response.
  router.get('/', function(req, res) {
    res.status(501).send();
  });

  // .. everything else.
  router.default(function(req, res) {
    res.status(404).send();
  });

  callback(null, router.response());
};
