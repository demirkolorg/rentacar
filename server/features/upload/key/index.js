const key = 'upload';
const name = 'Upload';
const group = 'UPLOAD';
const description = 'Upload';
const baseKeys = require('@base/key');

const keys = { ...baseKeys(key, name, group, description) };

module.exports = keys;
