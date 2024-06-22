const mongoose = require('mongoose');
const Firmalar = require('../../firma/model');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema(
  {
    firmaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Firmalar,
      required: true
    },
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
      acilisTarihi: { type: Number },
      calisanSayisi: { type: Number }
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
  { collection: 'Subeler' }
);

module.exports = mongoose.model('Subeler', schema);