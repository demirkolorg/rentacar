const key = 'role';
const name = 'Role';
const group = 'ROLE';
const description = 'Role';
const baseKeys = require('@base/key');

const keys = { ...baseKeys(key, name, group, description) };

module.exports = keys;
