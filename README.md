# lambda-lambda-lambda

[![npm version](https://badge.fury.io/js/lambda-lambda-lambda.svg)](https://badge.fury.io/js/lambda-lambda-lambda) [![](https://img.shields.io/npm/dm/lambda-lambda-lambda.svg)](https://www.npmjs.com/package/lambda-lambda-lambda) [![Build Status](https://api.travis-ci.com/nuxy/lambda-lambda-lambda.svg?branch=master)](https://app.travis-ci.com/github/nuxy/lambda-lambda-lambda)

[AWS Lambda@Edge](https://aws.amazon.com/lambda/edge) serverless application router.

![lambda-lambda-lambda](https://raw.githubusercontent.com/nuxy/lambda-lambda-lambda/master/package.png)

## Features

- [Routes](#route-handler) and URI [Resource](#resource-handler) support.
- Local/Globally scoped [Middleware](#middleware).
- Request/Response handling [API](#common-methods).
- Lightweight/cost effective solution.

## Dependencies

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Node.js](https://nodejs.org)

## Installation

Install package dependencies using [NPM](https://npmjs.com).

    $ npm install lambda-lambda-lambda

## Usage

### Lambda function

Unless your application requires [complex routing](#complex-routing), route handlers can be defined within the [Lambda function scope](https://docs.aws.amazon.com/lambda/latest/operatorguide/global-scope.html).

```javascript
// .. sam-app/src/app.js

'use strict';

// Load module.
const Router = require('lambda-lambda-lambda');

/**
 * @see AWS::Serverless::Function
 */
exports.handler = (event, context, callback) => {
  const {request, response} = event.Records[0].cf;

  const router = new Router(request, response);
  router.setPrefix('/api'); // optional

  // Middleware (order is important).
  router.use(function(req, res, next) {
    if (req.method() === 'CONNECT') {
      res.status(405).send();
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
```

### Common methods

The following methods are supported based on the class context.  For further information please refer to the [JSDoc generated documentation](#cli-options) which includes method `arguments`/`return` types and general usage examples.

#### Router

| Method                      | Description                               |
|-----------------------------|-------------------------------------------|
| `router.setPrefix(path)`    | Set URI path prefix.                      |
| `router.use(func)`          | Load the Route (e.g. [Middleware](#middleware)) handler. |
| `router.get(path, func)`    | Handle HTTP GET requests.                 |
| `router.put(path, func)`    | Handle HTTP PUT requests.                 |
| `router.patch(path, func)`  | Handle HTTP PATCH requests.               |
| `router.post(path, func)`   | Handle HTTP POST requests.                |
| `router.delete(path, func)` | Handle HTTP DELETE requests.              |
| `router.default(func)`      | Set router fallback (default route).      |
| `router.response()`         | Return the AWS response object.           |

#### router/Request

| Method              | Description                                       |
|---------------------|---------------------------------------------------|
| `req.is(mimeType)`  | Check `Accept` matches the given value.           |
| `req.header(name)`  | Return value for given HTTP header name.          |
| `req.getHeaders()`  | Return the headers of the request.                |
| `req.method()`      | Return the HTTP method of the request.            |
| `req.uri()`         | Return the relative path of the requested object. |
| `req.clientIp()`    | Return the HTTP client IP (remote address).       |
| `req.param()`       | Return the HTTP base64 body data as object.       |
| `req.queryString()` | Return the query string, if any, in the request.  |
| `req.body()`        | Return the base64-encoded body data.              |

#### router/Response

| Method                          | Description                     |
|---------------------------------|---------------------------------|
| `res.setHeader(name, value)`    | Set HTTP response header.       |
| `res.status(code).send(body)`   | Send the HTTP response (`Array`, `Buffer`, `Object`, `String`). |
| `res.status(code).data(buffer)` | Send binary data with HTTP response. |
| `res.status(code).json(obj)`    | Send the HTTP response as JSON. |
| `res.status(code).text(str)`    | Send the HTTP response as text. |

### Complex routing

When constructing a routing handler the following methods/aliases are supported.  While they can be used interchangeably they must define either a [Route](#route-handler) or [Resource](#resource-handler) handler, but not both.

| Handler Method | Alias  |
|----------------|--------|
| get            | index  |
| post           | submit |
| put            | create |
| patch          | update |
| delete         | N/A    |

#### Route handler

```javascript
// .. sam-app/src/routes/foo.js

'use strict';

// Load module.
const contentTypeHeader = require('middleware/ContentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: [contentTypeHeader], // Locally scoped.

  /**
   * GET /api/foo
   */
  index (req, res) {
    res.status(200).send('Lambda, Lambda, Lambda');
  },

  /**
   * PUT /api/foo
   */
  create (req, res) {
    res.status(201).send();
  },

  /**
   * PATCH /api/foo
   */
  update (req, res) {
    res.status(204).send();
  },

  /**
   * DELETE /api/foo
   */
  delete (req, res) {
    res.status(410).send();
  },

  /**
   * POST /api/foo
   */
  submit (req, res) {
    res.status(200).send();
  }
};
```

#### Resource handler

```javascript
// .. sam-app/src/routes/foo/bar.js

'use strict';

/**
 * @export {Object}
 */
module.exports = {
  resource: true,

  /**
   * GET /api/foo/bar/<resourceId>
   */
  get (req, res, id) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({and: 'Omega Mu'});
  },

  /**
   * PUT /api/foo/bar/<resourceId>
   */
  put (req, res, id) {
    res.status(201).send();
  },

  /**
   * PATCH /api/foo/bar/<resourceId>
   */
  patch (req, res, id) {
    res.status(204).send();
  },

  /**
   * DELETE /api/foo/bar/<resourceId>
   */
  delete (req, res, id) {
    res.status(410).send();
  },

  /**
   * POST /api/foo/bar/<resourceId>
   */
  post (req, res, id) {
    res.status(200).send();
  }
};

```

#### Mixed Route/Resource handler

```javascript
// .. sam-app/src/routes/foo.js

'use strict';

/**
 * @export {Object}
 */
module.exports = {
  resource: ['get', 'put', 'patch', 'submit'],

  /**
   * GET /api/foo
   */
  index (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Lambda, Lambda, Lambda');
  },

  /**
   * GET /api/foo/<resourceId>
   */
  get (req, res, id) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({and: 'Omega Mu'});
  },

  /**
   * PUT /api/foo
   */
  create (req, res) {
    res.status(201).send();
  },

  /**
   * PUT /api/foo/<resourceId>
   */
  put (req, res, id) {
    res.status(201).send();
  },

  /**
   * PATCH /api/foo
   */
  update (req, res) {
    res.status(204).send();
  },

  /**
   * PATCH /api/foo/<resourceId>
   */
  patch (req, res, id) {
    res.status(204).send();
  },

  /**
   * DELETE /api/foo
   */
  delete (req, res) {
    res.status(410).send();
  },

  /**
   * POST /api/foo/<resourceId>
   */
  submit (req, res, id) {
    res.status(200).send();
  }
};
```

### Middleware

#### Content-Type

```javascript
// .. sam-app/src/middleware/ContentTypeHeader.js

'use strict';

/**
 * Middleware to send Content-Type header.
 */
module.exports = (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');

  next(); // Run subsequent handler.
};
```

#### Access-Control

```javascript
// .. sam-app/src/middleware/AccessControlHeaders.js

'use strict';

/**
 * Middleware to send Access-Control-* headers.
 */
module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT');

  // Set CORS restrictions.
  res.setHeader('Access-Control-Allow-Origin',
    (config.development === true) ? 'http://localhost:9000' : 'https://domain.com'
  );

  // Handle preflight requests.
  if (req.method() === 'OPTIONS') {
    res.status(204).send();
  } else {
    next(); // Run subsequent handler.
  }
};
```

#### Basic Authentication

```javascript
// .. sam-app/src/middleware/BasicAuthHandler.js

'use strict';

/**
 * Middleware to prompt Basic Authentication.
 */
module.exports = (req, res, next) => {
  const username = "private";
  const password = "password";
  const authStr  = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  if (req.header('Authorization') !== authStr) {
    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(401).send('Unauthorized');
  } else {
    next(); // Run subsequent handler.
  }
};
```

## App Example

A [restfulAPI](https://github.com/nuxy/lambda-lambda-lambda/tree/master/example) has been provided with this package that can either be run locally in a [Docker container](https://code.visualstudio.com/docs/remote/containers) or deployed to [Lambda@Edge using SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html).

### Running in Docker

When launching [VS Code](https://code.visualstudio.com) you will be prompted to "Open as Container".  Once launched, the application can be accessed at: http://localhost:3000/api/example

### Deploying to AWS

    $ cd example & ./deploy

In order to successfully deploy you must have [set-up your AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/gs-cli.html) and have [created an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with the following [policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html):

- [IAMFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FIAMFullAccess)
- [AmazonS3FullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAmazonS3FullAccess)
- [CloudFrontFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FCloudFrontFullAccess)
- [AWSCloudFormationFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAWSCloudFormationFullAccess)
- [AWSLambda_FullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAWSLambda_FullAccess)

WARNING: The policies above are provided to ensure a successful application deployment.  It is recommended that you adjust these policies to meet the security requirements of your Lambda application.  They should NOT be used in a Production environment.

## Developers

### CLI options

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Generate documentation using [JSDoc](https://jsdoc.app):

    $ npm run gendoc

Run [Mocha](https://mochajs.org) integration tests:

    $ npm run test

## Contributions

If you fix a bug, or have a code you want to contribute, please send a pull-request with your changes. (Note: Before committing your code please ensure that you are following the [Node.js style guide](https://github.com/felixge/node-style-guide))

## Versioning

This package is maintained under the [Semantic Versioning](https://semver.org) guidelines.

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_lambda-lambda-lambda_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

[AWS](https://aws.amazon.com) is a registered trademark of Amazon Web Services, Inc.

## Author

[Marc S. Brooks](https://github.com/nuxy)
