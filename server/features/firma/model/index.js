const mongoose = require("mongoose");

const firmaSema = new mongoose.Schema(
  {
    is_active: { type: Boolean, default: true },
    ad: { type: String, required: true },
    logoUrl: { type: String },
    adres: {
      il: { type: String, required: true },
      ilce: { type: String, required: true },
      acikAdres: { type: String, required: true },
    },
    iletisim: {
      gsm: { type: String, required: true },
      gsmOps: { type: String},
      telefon: { type: String, required: true },
      eposta: { type: String, required: true },
    },
    ekBilgiler: {
      kurulusYili: { type: Number },
      subeSayisi: { type: Number },
    },
  },
  {
    collection: "Firmalar",
    timestamps: true,
  }
);

module.exports = mongoose.model("Firmalar", firmaSema);
