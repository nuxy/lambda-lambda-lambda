'use strict';

const app   = require(`${PACKAGE_ROOT}/test/e2e/sync/handler/app`);
const event = require(`${PACKAGE_ROOT}/test/event.json`);
const chai  = require('chai');

const expect = chai.expect;

describe('Resource handler (sync)', function() {
  describe('Resource /api/foo/bar/baz/qux', function() {
    const resourceId1 = 'uuid-123456_AbC';
    const resourceId2 = 'uuid-987654_Zyx';

    describe('GET', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should not return header', function() {
        expect(result.headers['x-request-id']).to.be.undefined;
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"index":true}');
      });
    });

    describe('GET (resource 1)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"get":true}');
      });
    });

    describe('GET (resource 2)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"get":true}');
      });
    });

    describe('PUT', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should not return header', function() {
        expect(result.headers['x-request-id']).to.be.undefined;
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"create":true}');
      });
    });

    describe('PUT (resource 1)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"put":true}');
      });
    });

    describe('PUT (resource 2)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PUT';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(201);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"put":true}');
      });
    });

    describe('PATCH', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should not return header', function() {
        expect(result.headers['x-request-id']).to.be.undefined;
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(204);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"update":true}');
      });
    });

    describe('PATCH (resource 1)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      // Handle Content Negotiation.
      event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(204);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"patch":true}');
      });
    });

    describe('PATCH (resource 2)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'PATCH';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(204);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"patch":true}');
      });
    });

    describe('DELETE (resource)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'DELETE';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(410);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"delete":true}');
      });
    });

    describe('POST', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should not return header', function() {
        expect(result.headers['x-request-id']).to.be.undefined;
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"submit":true}');
      });
    });

    describe('POST (resource 1)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId1);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"post":true}');
      });
    });

    describe('POST (resource 2)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'POST';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId2}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(result.headers['x-request-id'][0].value).to.equal(resourceId2);
        expect(result.headers['content-type'][0].key).to.equal('Content-Type');
        expect(result.headers['content-type'][0].value).to.equal('application/json');
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should return result.body', function() {
        expect(result.body).to.be.an('string');
        expect(result.body).to.equal('{"post":true}');
      });
    });

    describe('CONNECT (middleware)', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'CONNECT';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId1}`;

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      it('should not return result.headers', function() {
        expect(result.headers).to.be.an('object');
        expect(result.headers).to.be.empty;
      });

      it('should return result.status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(405);
      });

      it('should not return result.body', function() {
        expect(result.body).to.be.undefined;
      });
    });
  });
});
