'use strict';

const app   = require('../handler/app');
const event = require('./event.json');
const chai  = require('chai');

const expect = chai.expect;

describe('Test route /api/', function() {
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

describe('Test route /api/foo', function() {
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

describe('Test route /api/foo/bar', function() {
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

describe('Test route /api/foo/bar/baz', function() {
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

describe('Test resource /api/foo/bar/baz/qux/123456', function() {
  const resourceId = 'uuid-123456_AbC';

  describe('GET', function() {
    event.Records[0].cf.request.method = 'GET';
    event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

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
        expect(headers['x-request-id'][0].value).to.equal(resourceId);
        expect(headers['content-type'][0].key).to.equal('Content-Type');
        expect(headers['content-type'][0].value).to.equal('application/json');
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

  describe('PUT', function() {
    event.Records[0].cf.request.method = 'PUT';
    event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

    app.handler(event, null, function(undef, result) {
      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      const {headers, status, body} = result;

      it('should return headers', function() {
        expect(headers).to.be.an('object');
        expect(headers['x-request-id']).to.be.undefined;
        expect(headers['content-type'][0].key).to.equal('Content-Type');
        expect(headers['content-type'][0].value).to.equal('application/json');
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

  describe('PATCH', function() {
    event.Records[0].cf.request.method = 'PATCH';
    event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

    app.handler(event, null, function(undef, result) {
      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      const {headers, status, body} = result;

      it('should return headers', function() {
        expect(headers).to.be.an('object');
        expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(headers['x-request-id'][0].value).to.equal(resourceId);
        expect(headers['content-type'][0].key).to.equal('Content-Type');
        expect(headers['content-type'][0].value).to.equal('application/json');
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

  describe('DELETE', function() {
    event.Records[0].cf.request.method = 'DELETE';
    event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

    app.handler(event, null, function(undef, result) {
      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      const {headers, status, body} = result;

      it('should return headers', function() {
        expect(headers).to.be.an('object');
        expect(headers['x-request-id'][0].key).to.equal('X-Request-ID');
        expect(headers['x-request-id'][0].value).to.equal(resourceId);
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

  describe('POST', function() {
    event.Records[0].cf.request.method = 'POST';
    event.Records[0].cf.request.uri    = '/api/foo/bar/baz/qux';

    app.handler(event, null, function(undef, result) {
      it('should return an object', function() {
        expect(result).to.be.an('object');
      });

      const {headers, status, body} = result;

      it('should return headers', function() {
        expect(headers).to.be.an('object');
        expect(headers['x-request-id']).to.be.undefined;
        expect(headers['content-type'][0].key).to.equal('Content-Type');
        expect(headers['content-type'][0].value).to.equal('application/json');
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

  describe('CONNECT (middleware)', function() {
    event.Records[0].cf.request.method = 'CONNECT';
    event.Records[0].cf.request.uri    = `/api/foo/bar/baz/qux/${resourceId}`;

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

describe('Test route /api/unknown', function() {
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
