'use strict';

const app   = require('../handler/app');
const event = require('./event.json');
const chai  = require('chai');

const expect = chai.expect;

describe('Test route /api/', function() {
  describe('GET', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');
        expect(headers).to.be.empty;

        expect(status).to.be.an('number');
        expect(status).to.equal(501);

        expect(body).to.be.undefined;
      });
    });
  });
});

describe('Test route /api/foo', function() {
  describe('GET', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(200);

        expect(body).to.be.an('string');
        expect(body).to.equal('index');
      });
    });
  });

  describe('PUT', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(201);

        expect(body).to.be.an('string');
        expect(body).to.equal('create');
      });
    });
  });

  describe('PATCH', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(204);

        expect(body).to.be.an('string');
        expect(body).to.equal('update');
      });
    });
  });

  describe('DELETE', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(410);

        expect(body).to.be.an('string');
        expect(body).to.equal('delete');
      });
    });
  });

  describe('POST', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(200);

        expect(body).to.be.an('string');
        expect(body).to.equal('submit');
      });
    });
  });

  describe('CONNECT (middleware)', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = '/api/foo';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');
        expect(headers).to.be.empty;

        expect(status).to.be.an('number');
        expect(status).to.equal(405);

        expect(body).to.be.undefined;
      });
    });
  });
});

describe('Test route /api/foo/bar', function() {
  describe('GET', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(200);

        expect(body).to.be.an('string');
        expect(body).to.equal('index');
      });
    });
  });

  describe('PUT', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(201);

        expect(body).to.be.an('string');
        expect(body).to.equal('create');
      });
    });
  });

  describe('PATCH', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(204);

        expect(body).to.be.an('string');
        expect(body).to.equal('update');
      });
    });
  });

  describe('DELETE', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(410);

        expect(body).to.be.an('string');
        expect(body).to.equal('delete');
      });
    });
  });

  describe('POST', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(200);

        expect(body).to.be.an('string');
        expect(body).to.equal('submit');
      });
    });
  });

  describe('CONNECT (middleware)', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = '/api/foo/bar';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');
        expect(headers).to.be.empty;

        expect(status).to.be.an('number');
        expect(status).to.equal(405);

        expect(body).to.be.undefined;
      });
    });
  });
});

describe('Test route /api/foo/bar/baz', function() {
  describe('GET', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(200);

        expect(body).to.be.an('string');
        expect(body).to.equal('index');
      });
    });
  });

  describe('PUT', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'PUT';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(201);

        expect(body).to.be.an('string');
        expect(body).to.equal('create');
      });
    });
  });

  describe('PATCH', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'PATCH';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(204);

        expect(body).to.be.an('string');
        expect(body).to.equal('update');
      });
    });
  });

  describe('DELETE', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'DELETE';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(410);

        expect(body).to.be.an('string');
        expect(body).to.equal('delete');
      });
    });
  });

  describe('POST', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'POST';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');

        expect(headers[0]['content-type'].key).to.equal('Content-Type');
        expect(headers[0]['content-type'].value).to.equal('text/html');

        expect(status).to.be.an('number');
        expect(status).to.equal(200);

        expect(body).to.be.an('string');
        expect(body).to.equal('submit');
      });
    });
  });

  describe('CONNECT (middleware)', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'CONNECT';
      event.Records[0].cf.request.uri    = '/api/foo/bar/baz';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');
        expect(headers).to.be.empty;

        expect(status).to.be.an('number');
        expect(status).to.equal(405);

        expect(body).to.be.undefined;
      });
    });
  });
});

describe('Test route /api/unknown', function() {
  describe('GET', function() {
    it('returns response', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/unknown';

      app.handler(event, null, function(undef, result) {
        expect(result).to.be.an('object');

        const {headers, status, body} = result;

        expect(headers).to.be.an('array');
        expect(headers).to.be.empty;

        expect(status).to.be.an('number');
        expect(status).to.equal(404);

        expect(body).to.be.undefined;
      });
    });
  });
});
