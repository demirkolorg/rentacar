const key = 'firma';
const name = 'Firma';
const group = 'FIRMA';
const description = 'Firma';
const baseKeys = require('@base/key');

const keys = {
  ...baseKeys(key, name, group, description)
};

module.exports = keys;
