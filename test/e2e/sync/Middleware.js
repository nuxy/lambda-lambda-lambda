'use strict';

const app   = require(`${PACKAGE_ROOT}/test/e2e/sync/handler/app`);
const event = require(`${PACKAGE_ROOT}/test/event.json`);
const chai  = require('chai');

const expect = chai.expect;

describe('Middleware handler (sync)', function() {
  describe('ContentNegotiation', function() {
    const resourceId = 'uuid-123456_AbC';

    describe('supported value', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(200);
      });

      it('should not return body', function() {
        expect(result.body).to.be.an('string');
      });
    });

    describe('multiple values', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'application/json;plain/text';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(406);
      });

      it('should not return body', function() {
        expect(result.body).to.be.undefined;
      });
    });

    describe('unsupported value', function() {
      let result;

      before(function(done) {
        event.Records[0].cf.request.method = 'GET';
        event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

        // Handle Content Negotiation.
        event.Records[0].cf.request.headers['accept'][0].value = 'plain/text';

        app.handler(event, null, function(undef, response) {
          result = response;
          done();
        });
      });

      it('should return status', function() {
        expect(result.status).to.be.an('number');
        expect(result.status).to.equal(415);
      });

      it('should not return body', function() {
        expect(result.body).to.be.undefined;
      });
    });
  });
});
