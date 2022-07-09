const http = require('http');
const url  = require('url');

// Local modules.
const {handler} = require('../example/restfulAPI/src/app');

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
              querystring: req.path,
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

      res.statusCode = response.status;
      res.end(response.body);
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
