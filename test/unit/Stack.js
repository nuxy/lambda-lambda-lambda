'use strict';

const chai = require('chai');

const expect = chai.expect;

// Load modules.
const Common = require('../../src/router/Common.js');
const Stack  = require('../../src/router/Stack.js');

describe('Stack module', function() {
  describe('Instance methods', function() {
    describe('add()', function() {
      describe('middleware', function() {
        const stack = new Stack();

        const func = function(req, res, next) {};
        const name = 'middleware';

        Common.setFuncName(func, name);

        stack.add(func);

        const result = stack.middleware;

        it('should return value', function() {
          expect(result[0]).to.be.an('function');
          expect(result[0].name).to.equal(name);
        });
      });

      describe('routes', function() {
        const stack = new Stack();

        const func = function(req, res, next) {};
        const name = 'route:index';

        Common.setFuncName(func, name);

        stack.add(func);

        const result = stack.routes;

        it('should return value', function() {
          expect(result[0]).to.be.an('function');
          expect(result[0].name).to.equal(name);
        });
      });

      describe('resources', function() {
        const stack = new Stack();

        const func = function(req, res, next) {};
        const name = 'resource:index';

        Common.setFuncName(func, name);

        stack.add(func);

        const result = stack.resources;

        it('should return value', function() {
          expect(result[0]).to.be.an('function');
          expect(result[0].name).to.equal(name);
        });
      });

      describe('fallback', function() {
        const stack = new Stack();

        const func = function(req, res, next) {};
        const name = 'fallback';

        Common.setFuncName(func, name);

        stack.add(func);

        const result = stack.fallback;

        it('should return value', function() {
          expect(result).to.be.an('function');
          expect(result.name).to.equal(name);
        });
      });
    });

    describe('exec', function() {
      const stack = new Stack();

      let count = 0;

      const func = function(req, res, next) {
        count++;
        next();
      };

      stack.middleware = [func];
      stack.routes     = [func];
      stack.resources  = [func];
      stack.fallback   = func;

      stack.exec({}, {});

      it('should return value', function() {
        expect(count).to.equal(4);
      });
    });
  });
});
