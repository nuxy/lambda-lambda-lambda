'use strict';

const app   = require(`${PACKAGE_ROOT}/test/e2e/async/handler/app`);
const event = require(`${PACKAGE_ROOT}/test/event.json`);
const chai  = require('chai');

const expect = chai.expect;

describe('Resource handler (async)', function() {
  describe('Resource /api/foo/bar/baz/qux', function() {
    const resourceId1 = 'uuid-123456_AbC';
    const resourceId2 = 'uuid-987654_Zyx';

    describe('GET (missing resource)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(404);
      });

      it('should return body', function() {
        expect(result.body).to.be.undefined;
      });
    });

    describe('GET (resource 1)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"get":true}');
      });
    });

    describe('GET (resource 2)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"get":true}');
      });
    });

    describe('PUT (missing resource)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(404);
      });

      it('should return body', function() {
        expect(result.body).to.be.undefined;
      });
    });

    describe('PUT (resource 1)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"put":true}');
      });
    });

    describe('PUT (resource 2)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"put":true}');
      });
    });

    describe('PATCH (missing resource)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(404);
      });

      it('should return body', function() {
        expect(result.body).to.be.undefined;
      });
    });

    describe('PATCH (resource 1)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(204);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"patch":true}');
      });
    });

    describe('PATCH (resource 2)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(204);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"patch":true}');
      });
    });

    describe('DELETE (missing resource)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'DELETE';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(404);
      });

      it('should return body', function() {
        expect(result.body).to.be.undefined;
      });
    });

    describe('DELETE (resource)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'DELETE';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(410);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"delete":true}');
      });
    });

    describe('POST (missing resource)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(404);
      });

      it('should return body', function() {
        expect(result.body).to.be.undefined;
      });
    });

    describe('POST (resource 1)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"post":true}');
      });
    });

    describe('POST (resource 2)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"post":true}');
      });
    });

    describe('CONNECT (middleware)', function() {
      let result;

      before(async function() {
        event.Records[0].cf.request.method = 'CONNECT';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        result = await app.handler(event);
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should not return headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.be.empty;
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(405);
      });

      it('should not return body', function() {
        expect(result.body).to.be.undefined;
      });
    });
  });
});
