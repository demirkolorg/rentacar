const key = 'user';
const name = 'Kullanıcı';
const group = 'USER';
const description = 'Kullanıcı';
const baseKeys = require('@base/key');

const keys = { ...baseKeys(key, name, group, description) };

module.exports = keys;
