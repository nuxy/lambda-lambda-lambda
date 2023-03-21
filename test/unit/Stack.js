'use strict';

const event          = require(`${PACKAGE_ROOT}/test/event.json`);
const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

// Load modules.
const Common   = require(`${PACKAGE_ROOT}/src/router/Common.js`);
const Request  = require(`${PACKAGE_ROOT}/src/router/Request.js`);
const Response = require(`${PACKAGE_ROOT}/src/router/Response.js`);
const Stack    = require(`${PACKAGE_ROOT}/src/router/Stack.js`);

describe('Stack module', function() {
  describe('Instance methods', function() {
    describe('add', function() {
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
      describe('sync', function() {
        const stack = new Stack();

        let count = 0;

        const func1 = function(req, res, next) {
          res.setHeader('Middleware', true);
          count++;
          next();
        };

        Common.setFuncName(func1, 'middleware');

        const func2 = function(req, res, next) {
          res.setHeader('Route', true);
          res.status(200).send('Success');
          count++;
          next();
        };

        Common.setFuncName(func1, 'route:get');

        const func3 = function(req, res, next) {
          res.setHeader('Resource', true);
          res.status(200).send('Success');
          count++;
          next();
        };

        Common.setFuncName(func1, 'resource:get');

        const func4 = function(req, res, next) {
          res.setHeader('Fallback', true);
          res.status(200).send('Success');
          count++;
          next();
        };

        Common.setFuncName(func1, 'fallback');

        stack.middleware = [func1];
        stack.routes     = [func2];
        stack.resources  = [func3];
        stack.fallback   = func4;

        const req = new Request(event.Records[0].cf.request, {});
        const res = new Response({});

        stack.exec(req, res);

        const result = res.data();

        it('should execute functions', function() {
          expect(count).to.equal(4);
        });

        it('should return headers', function() {
          expect(result.headers.middleware).to.be.an('array');
          expect(result.headers.route).to.be.an('array');
          expect(result.headers.resource).to.be.an('array');
          expect(result.headers.fallback).to.be.an('array');
        });

        it('should return status', function() {
          expect(result.status).to.equal(200);
        });

        it('should return body', function() {
          expect(result.body).to.equal('Success');
        });
      });

      describe('async', function() {
        describe('complete', function() {
          const stack = new Stack();

          let count = 0;

          const func1 = async function(req, res, next) {
            res.setHeader('Middleware', true);
            await count++;
          };

          Common.setFuncName(func1, 'middleware');

          const func2 = async function(req, res, next) {
            res.setHeader('Route', true);
            res.status(200).send('Success');
            await count++;
          };

          Common.setFuncName(func1, 'route:get');

          const func3 = async function(req, res, next) {
            res.setHeader('Resource', true);
            res.status(200).send('Success');
            await count++;
          };

          Common.setFuncName(func1, 'resource:get');

          const func4 = async function(req, res, next) {
            res.setHeader('Fallback', true);
            res.status(200).send('Success');
            await count++;
          };

          Common.setFuncName(func1, 'fallback');

          stack.middleware = [func1];
          stack.routes     = [func2];
          stack.resources  = [func3];
          stack.fallback   = func4;

          const req = new Request(event.Records[0].cf.request, {});
          const res = new Response({});

          const promise = stack.exec(req, res);

          const result = res.data();

          it('should execute functions', function() {
            expect(count).to.equal(4);
          });

          it('should return headers', function() {
            expect(result.headers.middleware).to.be.an('array');
            expect(result.headers.route).to.be.an('array');
            expect(result.headers.resource).to.be.an('array');
            expect(result.headers.fallback).to.be.an('array');
          });

          it('should return status', function() {
            expect(result.status).to.equal(200);
          });

          it('should return body', function() {
            expect(result.body).to.equal('Success');
          });

          it('should resolve Promise', function() {
            return expect(promise).to.be.fulfilled;
          });
        });

        describe('next()', function() {
          const stack = new Stack();

          const func1 = async function(req, res, next) {
            res.setHeader('Middleware', true);
          };

          Common.setFuncName(func1, 'middleware');

          const func2 = async function(req, res, next) {
            res.setHeader('Middleware', true);
            next();
          };

          Common.setFuncName(func2, 'middleware');

          stack.middleware = [func1, func2];

          const req = new Request(event.Records[0].cf.request, {});
          const res = new Response({});

          it('should throw Error', function() {
            const promise = stack.exec(req, res);

            return expect(promise).to.be.rejectedWith(Error, /Middleware next\(\) is unsupported/);
          });
        });
      });
    });
  });
});
