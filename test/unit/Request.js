'use strict';

const event = require('../event.json');
const chai  = require('chai');
const clone = require('clone');

const expect = chai.expect;

// Load modules.
const Request = require('../../src/router/Request.js');

describe('Request module', function() {
  describe('Instance methods', function() {
    describe('data', function() {
      const request = new Request(event.Records[0].cf.request);

      const result = request.data();

      it('should return value', function() {
        expect(result).to.equal(event.Records[0].cf.request);
      });
    });

    describe('header', function() {
      const request = new Request(event.Records[0].cf.request);

      it('should return value', function() {
        expect(request.header('X-Forwarded-For')).to.equal('203.0.113.178');
        expect(request.header('User-Agent')).to.equal('Amazon CloudFront');
        expect(request.header('Host')).to.equal('example.org');
        expect(request.header('Unknown')).to.equal(undefined);
      });
    });

    describe('is', function() {
      const request = new Request(event.Records[0].cf.request);

      it('should return value', function() {
        expect(request.is('text/html')).to.be.true;
        expect(request.is('Unknown')).to.be.false;
      });
    });

    describe('param', function() {
      const obj = clone(event.Records[0].cf.request);

      describe('queryString', function() {

        // Alter cloned request.
        obj.querystring = 'foo=bar&biz=baz';

        const request = new Request(obj);

        describe('param()', function() {
          it('should return object', function() {
            const result = request.param();

            expect(result).to.deep.equal({foo: 'bar', biz: 'baz'});
          });
        });

        describe('param(argument)', function() {
          it('should return value', function() {
            const result = request.param('foo');

            expect(result).to.equal('bar');
          });
        });
      });

      describe('body', function() {

        // Alter cloned request.
        obj.body = 'Zm9vPWJhciZiaXo9YmF6==';

        const request = new Request(obj);

        describe('param()', function() {
          it('should return object', function() {
            const result = request.param();

            expect(result).to.deep.equal({foo: 'bar', biz: 'baz'});
          });
        });

        describe('param(argument)', function() {
          it('should return value', function() {
            const result = request.param('biz');

            expect(result).to.equal('baz');
          });
        });
      });
    });

    describe('method', function() {
      const request = new Request(event.Records[0].cf.request);

      const result = request.method();

      it('should return value', function() {
        expect(result).to.equal('GET');
      });
    });

    describe('queryString', function() {
      const obj = clone(event.Records[0].cf.request);

      // Alter cloned request.
      obj.querystring = 'foo=bar&biz=baz';

      const request = new Request(obj);

      const result = request.queryString();

      it('should return value', function() {
        expect(result).to.equal(obj.querystring);
      });
    });

    describe('uri', function() {
      const request = new Request(event.Records[0].cf.request);

      const result = request.uri();

      it('should return value', function() {
        expect(result).to.equal('/api');
      });
    });

    describe('clientIp', function() {
      const request = new Request(event.Records[0].cf.request);

      const result = request.clientIp();

      it('should return value', function() {
        expect(result).to.equal('203.0.113.178');
      });
    });

    describe('body', function() {
      const request = new Request(event.Records[0].cf.request);

      const result = request.body();

      it('should return value', function() {
        expect(result).to.equal('Zm9vPWJhciZiaXo9YmF6==');
      });
    });

    describe('getHeaders', function() {
      const request = new Request(event.Records[0].cf.request);

      const result = request.getHeaders();

      it('should return value', function() {
        expect(result).to.equal(event.Records[0].cf.request.headers);
      });
    });
  });

  describe('Static methods', function() {
    describe('parseBody', function() {
      const result = Request.parseBody('Zm9vPWJhciZiaXo9YmF6==');

      it('should return value', function() {
        expect(result).to.deep.equal({foo: 'bar', biz: 'baz'});
      });
    });

    describe('parseParams', function() {
      const result = Request.parseParams('foo=bar&biz=baz');

      it('should return value', function() {
        expect(result).to.deep.equal({foo: 'bar', biz: 'baz'});
      });
    });

    describe('isParams', function() {
      const result1 = Request.isParams('foo=bar&biz=baz');
      const result2 = Request.isParams('foo*bar*biz*baz');

      it('should return value', function() {
        expect(result1).to.be.true;
        expect(result2).to.be.false;
      });
    });

    describe('isJson', function() {
      const data = {foo: 'bar', biz: 'baz'};

      const result1 = Request.isJson(JSON.stringify(data));
      const result2 = Request.isJson(data);

      it('should return value', function() {
        expect(result1).to.be.true;
        expect(result2).to.be.false;
      });
    });
  });
});
