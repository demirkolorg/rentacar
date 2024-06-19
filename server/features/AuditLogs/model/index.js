const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    level: String,
    user_id: mongoose.Schema.Types.ObjectId,
    location: String,
    transaction: String,
    log: mongoose.SchemaTypes.Mixed
  },
  {
    collection: 'DenetimLoglari',
    versionKey: false,
    timestamps: {
      createdAt: 'created_at'
    }
  }
);

class AuditLogs extends mongoose.Model {}

schema.loadClass(AuditLogs);
module.exports = mongoose.model('DenetimLoglari', schema);
