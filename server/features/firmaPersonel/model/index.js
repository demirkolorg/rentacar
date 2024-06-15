const mongoose = require('mongoose');
const base  = require('@features/base/model/base.js');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    firma: { type: ObjectId, ref: 'Firmalar', required: true },
    pozisyon: { type: ObjectId, ref: 'Pozisyonlar', required: true },
    user: { type: ObjectId, ref: 'Users', required: true }
  },
  { collection: 'FirmaPersonelleri' }
);

schema.add(base);
module.exports = mongoose.model('FirmaPersonelleri', schema);
module.exports.pointname = 'FirmaPersonelleri';