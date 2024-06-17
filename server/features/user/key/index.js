const { key, name, group, description } = require('../admin');
const baseKeys = require('@base/key');
const keys = { ...baseKeys(key, name, group, description) };
module.exports = keys;
