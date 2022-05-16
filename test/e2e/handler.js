'use strict';

const app   = require('./handler/app');
const event = require('../event.json');
const chai  = require('chai');

const expect = chai.expect;

describe('Router handler', function() {
  describe('Route /api/', function() {
    describe('GET', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should not return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers).to.be.empty;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(501);
        });

        it('should not return body', function() {
          expect(body).to.be.undefined;
        });
      });
    });
  });

  describe('Route /api/foo', function() {
    describe('GET', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo:index');
        });
      });
    });

    describe('PUT', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(201);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo:create');
        });
      });
    });

    describe('PATCH', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(204);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo:update');
        });
      });
    });

    describe('DELETE', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(410);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo:delete');
        });
      });
    });

    describe('POST', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo:submit');
        });
      });
    });

    describe('CONNECT (middleware)', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should not return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers).to.be.empty;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(405);
        });

        it('should not return body', function() {
          expect(body).to.be.undefined;
        });
      });
    });
  });

  describe('Route /api/foo/bar', function() {
    describe('GET', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar:index');
        });
      });
    });

    describe('PUT', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(201);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar:create');
        });
      });
    });

    describe('PATCH', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(204);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar:update');
        });
      });
    });

    describe('DELETE', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(410);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar:delete');
        });
      });
    });

    describe('POST', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar:submit');
        });
      });
    });

    describe('CONNECT (middleware)', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should not return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers).to.be.empty;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(405);
        });

        it('should not return body', function() {
          expect(body).to.be.undefined;
        });
      });
    });
  });

  describe('Route /api/foo/bar/baz', function() {
    describe('GET', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar/baz:index');
        });
      });
    });

    describe('PUT', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(201);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar/baz:create');
        });
      });
    });

    describe('PATCH', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(204);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar/baz:update');
        });
      });
    });

    describe('DELETE', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(410);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar/baz:delete');
        });
      });
    });

    describe('POST', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('text/html');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('foo/bar/baz:submit');
        });
      });
    });

    describe('CONNECT (middleware)', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should not return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers).to.be.empty;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(405);
        });

        it('should not return body', function() {
          expect(body).to.be.undefined;
        });
      });
    });
  });

  describe('Resource /api/foo/bar/baz/qux', function() {
    const resourceId1 = 'uuid-123456_AbC';
    const resourceId2 = 'uuid-987654_Zyx';

    describe('GET (route)', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should not return header', function() {
          expect(headers['x-request-id']).to.be.undefined;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"index":true}');
        });
      });
    });

    describe('GET (resource 1)', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId1);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"get":true}');
        });
      });
    });

    describe('GET (resource 2)', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId2);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"get":true}');
        });
      });
    });

    describe('PUT (route)', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should not return header', function() {
          expect(headers['x-request-id']).to.be.undefined;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(201);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"create":true}');
        });
      });
    });

    describe('PUT (resource 1)', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId1);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(201);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"put":true}');
        });
      });
    });

    describe('PUT (resource 2)', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId2);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(201);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"put":true}');
        });
      });
    });

    describe('PATCH (route)', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should not return header', function() {
          expect(headers['x-request-id']).to.be.undefined;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(204);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"update":true}');
        });
      });
    });

    describe('PATCH (resource 1)', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId1);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(204);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"patch":true}');
        });
      });
    });

    describe('PATCH (resource 2)', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId2);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(204);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"patch":true}');
        });
      });
    });

    describe('DELETE (resource)', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId1);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(410);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"delete":true}');
        });
      });
    });

    describe('POST (route)', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should not return header', function() {
          expect(headers['x-request-id']).to.be.undefined;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"submit":true}');
        });
      });
    });

    describe('POST (resource 1)', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId1);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"post":true}');
        });
      });
    });

    describe('POST (resource 2)', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
          expect(headers['x-request-id'][0].value).to.equal(resourceId2);
          expect(headers['content-type'][0].key).to.equal('Content-Type');
          expect(headers['content-type'][0].value).to.equal('application/json');
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(200);
        });

        it('should return body', function() {
          expect(body).to.be.an('string');
          expect(body).to.equal('{"post":true}');
        });
      });
    });

    describe('CONNECT (middleware)', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should not return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers).to.be.empty;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(405);
        });

        it('should not return body', function() {
          expect(body).to.be.undefined;
        });
      });
    });
  });

  describe('Route /api/unknown', function() {
    describe('GET', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/unknown';

      app.handler(event, null, function(undef, result) {
        it('should return an object', function() {
          expect(result).to.be.an('object');
        });

        const {headers, status, body} = result;

        it('should not return headers', function() {
          expect(headers).to.be.an('object');
          expect(headers).to.be.empty;
        });

        it('should return status', function() {
          expect(status).to.be.an('number');
          expect(status).to.equal(404);
        });

        it('should not return body', function() {
          expect(body).to.be.undefined;
        });
      });
    });
  });
});
