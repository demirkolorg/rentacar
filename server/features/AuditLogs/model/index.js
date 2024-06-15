const mongoose = require('mongoose');
const Kullanicilar = require('../../user/model');

const schema = mongoose.Schema(
  {
    level: String,
    user_id: mongoose.Schema.Types.ObjectId,
    location: String,
    proc_type: String,
    log: mongoose.SchemaTypes.Mixed
  },
  {
    collection: 'DenetimLoglari',
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

class AuditLogs extends mongoose.Model {}

schema.loadClass(AuditLogs);
module.exports = mongoose.model('DenetimLoglari', schema);
module.exports.pointname = 'DenetimLoglari';
