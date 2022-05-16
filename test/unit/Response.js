'use strict';

const event = require('../event.json');
const chai  = require('chai');

const expect = chai.expect;

// Load modules.
const Response = require('../../src/router/Response.js');

describe('Response module', function() {
  describe('Instance methods', function() {
    describe('data', function() {
      const response = new Response(event.Records[0].cf.response);

      const result = response.data();

      it('should return value', function() {
        expect(result).to.deep.equal({headers: {}, status: null});
      });
    });

    describe('json', function() {
      const response = new Response(event.Records[0].cf.response);

      const data = {foo: 'bar', biz: 'baz'};

      const result = response.json(data);

      it('should return value', function() {
        expect(result).to.equal(JSON.stringify(data));
      });
    });

    describe('text', function() {
      const response = new Response(event.Records[0].cf.response);

      const result = response.text(123456);

      it('should return value', function() {
        expect(result).to.equal('123456');
      });
    });

    describe('setHeader', function() {
      const response = new Response(event.Records[0].cf.response);

      response.setHeader('foo', 'bar');

      const result = response.data().headers;

      it('should return value', function() {
        expect(result).to.deep.equal({'foo': [{'key': 'foo', 'value': 'bar'}]});
      });
    });

    describe('status', function() {
      describe('.send', function() {
        const code = 123;
        const text = 'foo-bar';

        const response = new Response(event.Records[0].cf.response);

        response.status(code).send(text);

        it('should return status', function() {
          expect(response.data().status).to.equal(code);
        });

        it('should return body', function() {
          expect(response.data().body).to.equal(text);
        });
      });

      describe('.json', function() {
        const code = 456;
        const data = {foo: 'bar'};

        const response = new Response(event.Records[0].cf.response);

        response.status(code).json(data);

        it('should return status', function() {
          expect(response.data().status).to.equal(code);
        });

        it('should return body', function() {
          expect(response.data().body).to.equal(JSON.stringify(data));
        });
      });
    });
  });
});
