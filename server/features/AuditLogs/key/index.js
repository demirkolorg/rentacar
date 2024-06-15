const key = 'auditlogs';
const name = 'Auditlogs';
const group = 'AUDITLOGS';
const description = 'Auditlogs';
const baseKeys = require('@base/key');

const keys = {
  ...baseKeys(key, name, group, description)
};

module.exports = keys;
