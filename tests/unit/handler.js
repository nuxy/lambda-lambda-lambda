'use strict';

const app   = require('../app/handler');
const event = require('./event.json');
const chai  = require('chai');

const expect = chai.expect;

describe('Response', function() {
  it('returns object', function() {
    app.handler(event, null, function(undef, result) {
      expect(result).to.be.an('object');

      const {headers, status, body} = result;

      expect(headers).to.be.an('array');

      expect(headers[0]['content-type'].key).to.equal('Content-Type');
      expect(headers[0]['content-type'].value).to.equal('text/html');

      expect(status).to.be.an('number');
      expect(status).to.equal(200);

      expect(body).to.be.an('string');
      expect(body).to.equal('Hello World');
    });
  });
});
