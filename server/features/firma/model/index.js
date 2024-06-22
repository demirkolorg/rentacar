const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    ad: { type: String, required: true },
    logoUrl: { type: String },
    adres: {
      il: { type: String, required: true },
      ilce: { type: String, required: true },
      acikAdres: { type: String, required: true }
    },
    iletisim: {
      gsm: { type: String, required: true },
      gsmOps: { type: String },
      telefon: { type: String, required: true },
      eposta: { type: String, required: true }
    },
    ekBilgiler: {
      kurulusYili: { type: Number },
      subeSayisi: { type: Number }
    },
    documentinfo: {
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
  { collection: 'Firmalar' }
);

module.exports = mongoose.model('Firmalar', schema);
