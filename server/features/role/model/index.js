const mongoose = require('mongoose');
const RolAyricaliklari = require('@helper/permissions');
const base = require('@features/base/model/base.js');

const schema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String, required: true }]
  },
  {
    collection: 'Roller'
  }
);

schema.add(base);
module.exports = mongoose.model('Roller', schema);
