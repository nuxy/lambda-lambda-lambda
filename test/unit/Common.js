'use strict';

const chai = require('chai');

const expect = chai.expect;

// Load modules.
const Common = require(`${PACKAGE_ROOT}/src/router/Common.js`);

describe('Common module', function() {
  describe('Static methods', function() {
    describe('isPromise', function() {
      const result1 = Common.isPromise(new Promise(() => {}));
      const result2 = Common.isPromise(new Object());
      const result3 = Common.isPromise(new Function());

      it('should return value', function() {
        expect(result1).to.be.true;
        expect(result2).to.be.false;
        expect(result3).to.be.false;
      });
    });

    describe('isValidPath', function() {
      const result1 = Common.isValidPath('/');
      const result2 = Common.isValidPath('/foo_bar');
      const result3 = Common.isValidPath('/foo_bar/biz-baz');
      const result4 = Common.isValidPath('/foo_bar/biz-baz/qux*');
      const result5 = Common.isValidPath('/foo_bar/biz-baz/qux?name=value');
      const result6 = Common.isValidPath('foo_bar/biz-baz/qux/qax');

      it('should return value', function() {
        expect(result1).to.be.true;
        expect(result2).to.be.true;
        expect(result3).to.be.true;
        expect(result4).to.be.false;
        expect(result5).to.be.false;
        expect(result6).to.be.false;
      });
    });

    describe('isValidFunc', function() {
      const result1 = Common.isValidFunc(function(req, res, next) {});
      const result2 = Common.isValidFunc(function(req, res) {});
      const result3 = Common.isValidFunc(function(req) {});
      const result4 = Common.isValidFunc(function() {});

      it('should return value', function() {
        expect(result1).to.be.true;
        expect(result2).to.be.true;
        expect(result3).to.be.true;
        expect(result4).to.be.false;
      });
    });

    describe('isValidRoute', function() {
      const result1 = Common.isValidRoute('/foo/bar/biz', '/foo/bar/biz', function(req, res, next) {});
      const result2 = Common.isValidRoute('/foo/bar', '/foo', function(req, res, next) {});
      const result3 = Common.isValidRoute('/foo', '/foo/bar', function(req, res, next) {});
      const result4 = Common.isValidRoute('/', '/foo', function(req, res, next) {});

      it('should return value', function() {
        expect(result1).to.be.true;
        expect(result2).to.be.true;
        expect(result3).to.be.false;
        expect(result4).to.be.false;
      });
    });

    describe('getResourceId', function() {
      const result1 = Common.getResourceId('/foo/bar/abc123', '/foo/bar/biz', function(req, res, next) {});
      const result2 = Common.getResourceId('/foo/bar/abc123', '/foo/bar', function(req, res, next) {});
      const result3 = Common.getResourceId('/foo/abc123', '/foo/bar', function(req, res, next) {});
      const result4 = Common.getResourceId('/foo/abc123', '/foo', function(req, res, next) {});

      it('should return value', function() {
        expect(result1).to.be.undefined;
        expect(result2).to.equal('abc123');
        expect(result3).to.be.undefined;
        expect(result4).to.equal('abc123');
      });
    });

    describe('setFuncName', function() {
      const func = function(req, res, next) {};

      Common.setFuncName(func, 'foo');

      it('should return value', function() {
        expect(func.name).to.be.an('string');
        expect(func.name).to.equal('foo');
      });
    });

    describe('moduleParent', function() {
      const path = Common.moduleParent();

      it('should return value', function() {
        expect(path).to.be.an('string');
      });
    });
  });
});
