const Module = require('module');

const _require = Module.prototype.require;

// Override altered event state from prior tests.
Module.prototype.require = function(name) {
  if (/\/event.json$/.test(name)) {
    delete require.cache[require.resolve('./event.json')];
  }

  return _require.apply(this, arguments);
};

// Global shorthand.
global.PACKAGE_ROOT = process.cwd();
