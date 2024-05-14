const mongoose = require("mongoose");
const Firmalar=require("../../firma/model")
const subeSema = new mongoose.Schema(
  {
    firmaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Firmalar,
      required: true
    },
    is_active: { type: Boolean, default: true },
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
    }
  },
  {
    collection: "Subeler",
    timestamps: true
  }
);

module.exports = mongoose.model("Subeler", subeSema);
