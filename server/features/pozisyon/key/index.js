const key = 'pozisyon';
const name = 'Pozisyon';
const group = 'POZISYON';
const description = 'Pozisyon';
const baseKeys = require('@base/key');

const keys = {
  ...baseKeys(key, name, group, description)
};

module.exports = keys;
