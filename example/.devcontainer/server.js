/**
 *  lambda-lambda-lambda
 *  AWS Lambda@Edge serverless application router.
 *
 *  Copyright 2021-2023, Marc S. Brooks (https://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

const http = require('http');
const url  = require('url');

// Local modules.
const {handler} = require('../restfulApiHandler/src/app');

/**
 * Init Lambda@Edge script environment.
 */
http.createServer(function(req, res) {
  let body;

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    if (body) {
      body = encodeBody(body);
    }

    // Simulate AWS origin-request event.
    const event = {
      Records: [
        {
          cf: {
            request: {
              clientIp: res.socket.remoteAddress,
              headers: formatHeaders(req.headers).toEdge(),
              method: req.method,
              querystring: url.parse(req.url).query,
              uri: url.parse(req.url).pathname,
              body: {
                data: body
              }
            }
          }
        }
      ]
    };

    // .. and callback() application handler.
    const callback = function(request, response) {
      const headers = formatHeaders(response.headers).toNode();
      headers.map(header => res.setHeader(header.key, header.value));

      let {body, bodyEncoding, status} = response;

      // Override Edge required media encoding.
      if (bodyEncoding === 'base64') {
        body = Buffer.from(body, 'base64');
      }

      res.statusCode = status;

      res.end(body);
    };

    // Run lambda-lambda-lambda
    handler(event, null, callback);
  });
}).listen(3000);

/**
 * Return base64 encoded body as string.
 *
 * @param {String} str
 *   Body data as string.
 *
 * @return {String}
 */
function encodeBody(str) {
  return Buffer.from(str).toString('base64');
}

/**
 * Return converted headers (lambda/node).
 *
 * @param {Object} obj
 *   Node request headers object.
 *
 * @return {Object}
 */
function formatHeaders(obj) {
  return {

    // Request format.
    toEdge: function() {
      Object.keys(obj).forEach(function(key) {
        obj[key] = [{
          key,
          value: obj[key]
        }];
      });
      return obj;
    },

    // Response format.
    toNode: function() {
      return Object.keys(obj).map(function(key) {
        return {
          key,
          value: obj[key][0].value
        };
      });
    }
  };
}
