const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Base Schema
const base = new mongoose.Schema(
  {
    documentinfo: {
      sube: { type: ObjectId, ref: 'Subeler', required: true },
      is_active: { type: Boolean, default: true },
      is_archive: { type: Boolean, default: false },
      is_delete: { type: Boolean, default: false },
      created_by: { type: ObjectId, required: true },
      created_at: { type: Date },
      updated_by: { type: ObjectId },
      updated_at: { type: Date },
      versionKey: { type: Number, default: 0 }
    }
  },
  { versionKey: false }
);

// Middleware to set timestamps and increment versionKey
base.pre('save', function (next) {
  this.documentinfo.versionKey++;

  if (!this.documentinfo.created_at) {
    this.documentinfo.created_at = Date.now();
  }
  next();
});

base.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (!update.$set) {
    update.$set = {};
  }

  // Güncelleme sırasında alt alanları güncelle
  update.$set['documentinfo.updated_at'] = Date.now();
  update.$set['documentinfo.updated_by'] = this.options.context.userId;

  if (!update.$inc) {
    update.$inc = {};
  }
  update.$inc['documentinfo.versionKey'] = 1;

  next();
});

module.exports = base;
