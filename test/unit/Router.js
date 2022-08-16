'use strict';

const event = require('../event.json');
const chai  = require('chai');

const expect = chai.expect;

// Load modules.
const Router = require('../../src/Router.js');

describe('Router module', function() {
  describe('Instance methods', function() {
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
