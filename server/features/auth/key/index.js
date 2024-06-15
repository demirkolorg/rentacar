const key = 'auth';
const name = 'Auth';
const group = 'AUTH';
const description = 'Auth';
const baseKeys = require('@base/key');

const keys = {
  ...baseKeys(key, name, group, description)
};

module.exports = keys;
