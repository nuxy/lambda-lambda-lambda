# lambda-lambda-lambda

[![npm version](https://badge.fury.io/js/lambda-lambda-lambda.svg)](https://badge.fury.io/js/lambda-lambda-lambda) [![](https://img.shields.io/npm/dm/lambda-lambda-lambda.svg)](https://www.npmjs.com/package/lambda-lambda-lambda) [![Build Status](https://api.travis-ci.com/nuxy/lambda-lambda-lambda.svg?branch=master)](https://app.travis-ci.com/github/nuxy/lambda-lambda-lambda)

AWS Lambda@Edge serverless application router.

![lambda-lambda-lambda](https://raw.githubusercontent.com/nuxy/lambda-lambda-lambda/master/package.png)

## Features

- Routes and URI resource support.
- Local/Globally scoped middleware.
- Request/Response handling API.
- Lightweight/cost effective solution.

## Dependencies

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Node.js](https://nodejs.org)

## Installation

Install package dependencies using [NPM](https://npmjs.com).

    $ npm install lambda-lambda-lambda

## Usage

### Lambda function

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

### Route handler

```javascript
// .. sam-app/src/routes/foo.js

'use strict';

// Load module.
const contentTypeHeader = require('middleware/ContentTypeHeader');

/**
 * @export {Object}
 */
module.exports = {
  middleware: [contentTypeHeader],

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

### Resource handler

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
  index (req, res, id) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({and: 'Omega Mu'});
  },

  /**
   * PUT /api/foo/bar/<resourceId>
   */
  create (req, res, id) {
    res.status(201).send();
  },

  /**
   * PATCH /api/foo/bar/<resourceId>
   */
  update (req, res, id) {
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
  submit (req, res, id) {
    res.status(200).send();
  }
};

```

### Mixed Route/Resource handler

```javascript
// .. sam-app/src/routes/foo.js

'use strict';

/**
 * @export {Object}
 */
module.exports = {
  resource: ['index'],

  /**
   * GET /api/foo/<resourceId>
   */
  index (req, res, id) {
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

### Middleware

```javascript
// .. sam-app/src/middleware/ContentTypeHeader.js

'use strict';

/**
 * Middleware to send Content-Type header.
 */
module.exports = (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');

  next();
};
```

## App Example

A deployable application has been [provided](https://github.com/nuxy/lambda-lambda-lambda/tree/master/example) with this package.  In order to successfully deploy you must have [set-up your AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/gs-cli.html) and have [created an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with the following [policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html):

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
