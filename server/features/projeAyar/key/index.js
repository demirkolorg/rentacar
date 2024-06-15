const key = 'projeAyar';
const name = 'Proje Ayar';
const group = 'PROJEAYAR';
const description = 'Proje Ayar';
const baseKeys = require('@base/key');

const keys = { ...baseKeys(key, name, group, description) };

module.exports = keys;
