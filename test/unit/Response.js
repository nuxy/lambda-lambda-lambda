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

        describe('buffer (argument)', function() {
          const data = 'foo-bar';
          const arg  = Buffer.from(data);

          const response = new Response(event.Records[0].cf.response);
          response.status(code).send(arg);

          it('should return status', function() {
            expect(response.data().status).to.equal(code);
          });

          it('should return body', function() {
            expect(
              Buffer.from(response.data().body, 'base64').toString('ascii')
            ).to.equal(data);
          });

          it('should return encoding', function() {
            expect(response.data().bodyEncoding).to.equal('base64');
          });
        });

        describe('json (argument)', function() {
          const arg = {foo: 'bar'};

          const response = new Response(event.Records[0].cf.response);
          response.status(code).send(arg);

          it('should return status', function() {
            expect(response.data().status).to.equal(code);
          });

          it('should return body', function() {
            expect(response.data().body).to.equal(JSON.stringify(arg));
          });

          it('should return encoding', function() {
            expect(response.data().bodyEncoding).to.equal('text');
          });
        });

        describe('text (argument)', function() {
          const arg = 'foo-bar';

          const response = new Response(event.Records[0].cf.response);
          response.status(code).send(arg);

          it('should return status', function() {
            expect(response.data().status).to.equal(code);
          });

          it('should return body', function() {
            expect(response.data().body).to.equal(arg);
          });

          it('should return encoding', function() {
            expect(response.data().bodyEncoding).to.equal('text');
          });
        });
      });

      describe('.data', function() {
        const code = 456;
        const data = 'foo-bar';
        const arg  = Buffer.from(data);

        const response = new Response(event.Records[0].cf.response);
        response.status(code).data(arg);

        it('should return status', function() {
          expect(response.data().status).to.equal(code);
        });

        it('should return body', function() {
          expect(
            Buffer.from(response.data().body, 'base64').toString('ascii')
          ).to.equal(data);
        });

        it('should return encoding', function() {
          expect(response.data().bodyEncoding).to.equal('base64');
        });
      });

      describe('.json', function() {
        const code = 456;
        const arg  = {foo: 'bar'};

        const response = new Response(event.Records[0].cf.response);
        response.status(code).json(arg);

        it('should return status', function() {
          expect(response.data().status).to.equal(code);
        });

        it('should return body', function() {
          expect(response.data().body).to.equal(JSON.stringify(arg));
        });

        it('should return encoding', function() {
          expect(response.data().bodyEncoding).to.equal('text');
        });
      });

      describe('.text', function() {
        const code = 456;
        const arg  = 'foo-bar';

        const response = new Response(event.Records[0].cf.response);
        response.status(code).text(arg);

        it('should return status', function() {
          expect(response.data().status).to.equal(code);
        });

        it('should return body', function() {
          expect(response.data().body).to.equal(arg);
        });

        it('should return encoding', function() {
          expect(response.data().bodyEncoding).to.equal('text');
        });
      });
    });
  });
});
