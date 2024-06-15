const key = 'firmaPersonel';
const name = 'Firma Personel';
const group = 'FIRMAPERSONEL';
const description = 'Firma Personel';
const baseKeys = require('@base/key');

const keys = { ...baseKeys(key, name, group, description) };

module.exports = keys;
