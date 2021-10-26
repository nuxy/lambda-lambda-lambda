'use strict';

const app   = require('../handler/app');
const event = require('./event.json');
const chai  = require('chai');

const expect = chai.expect;

describe('GET /api/test', function() {
  it('returns response', function() {
    event.Records[0].cf.request.method = 'GET';

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

describe('PUT /api/test', function() {
  it('returns response', function() {
    event.Records[0].cf.request.method = 'PUT';

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

describe('PATCH /api/test', function() {
  it('returns response', function() {
    event.Records[0].cf.request.method = 'PATCH';

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

describe('DELETE /api/test', function() {
  it('returns response', function() {
    event.Records[0].cf.request.method = 'DELETE';

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

describe('POST /api/test', function() {
  it('returns response', function() {
    event.Records[0].cf.request.method = 'POST';

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

describe('CONNECT /api/test (middleware)', function() {
  it('returns response', function() {
    event.Records[0].cf.request.method = 'CONNECT';

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

describe('GET /api/ (root response)', function() {
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

describe('GET /api/unknown (.. everything else)', function() {
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
