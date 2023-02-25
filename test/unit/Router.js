'use strict';

const event = require('../event.json');
const chai  = require('chai');

const expect = chai.expect;

// Load modules.
const Router = require('../../src/Router.js');

describe('Router module', function() {
  describe('Instance methods', function() {
    describe('handle', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo-bar';

      it('should add stack value', function() {
        const router = new Router(event.Records[0].cf.request);

        router.handle('/api/foo-bar', function(req, res, next) {
          return true;
        });

        const stackFunc = router.stack.routes[0];

        expect(stackFunc).to.be.an('function');
        expect(stackFunc.name).to.equal('route::undefined');
        expect(stackFunc()).to.equal(true);
      });

      it('should NOT add stack value', function() {
        const router = new Router(event.Records[0].cf.request);

        router.handle('/api/biz-baz', function(req, res, next) {});

        const stackFunc = router.stack.routes[0];

        expect(stackFunc).to.be.undefined;
      });
    });

    describe('use', function() {
      event.Records[0].cf.request.method = 'GET';
      event.Records[0].cf.request.uri    = '/api/foo-bar';

      it('should add stack value', function() {
        const router = new Router(event.Records[0].cf.request);

        router.use('/api/foo-bar', function(req, res, next) {
          return true;
        });

        router.use(function(req, res, next) {
          return true;
        });

        const stackFunc1 = router.stack.middleware[0];

        expect(stackFunc1).to.be.an('function');
        expect(stackFunc1.name).to.equal('middleware:/api/foo-bar');
        expect(stackFunc1()).to.equal(true);

        const stackFunc2 = router.stack.middleware[1];

        expect(stackFunc2).to.be.an('function');
        expect(stackFunc2.name).to.equal('middleware');
        expect(stackFunc2()).to.equal(true);
      });

      it('should NOT add stack value', function() {
        const router = new Router(event.Records[0].cf.request);

        router.use('/api/biz-baz', function(req, res, next) {});
        router.use(function() {});

        const stackFunc1 = router.stack.middleware[0];
        const stackFunc2 = router.stack.middleware[1];

        expect(stackFunc1).to.be.undefined;
        expect(stackFunc2).to.be.undefined;
      });
    });

    describe('setPrefix', function() {
      const router = new Router(event.Records[0].cf.request);

      it('should not define property', function() {
        router.setPrefix('/');

        expect(router.prefix).to.equal('');
      });

      it('should define property', function() {
        router.setPrefix('/foo_bar');

        expect(router.prefix).to.equal('/foo_bar');
      });
    });
  });
});
