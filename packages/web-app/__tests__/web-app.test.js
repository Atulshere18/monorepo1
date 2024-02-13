'use strict';

const webApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(webApp(), 'Hello from webApp');
console.info('webApp tests passed');
