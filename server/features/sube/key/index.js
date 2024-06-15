const key = 'sube';
const name = 'Şube';
const group = 'SUBE';
const description = 'Şube';
const baseKeys = require('@base/key');

const keys = { ...baseKeys(key, name, group, description) };

module.exports = keys;
