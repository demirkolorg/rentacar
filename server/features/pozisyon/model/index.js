const mongoose = require("mongoose");
const slugify = require("slugify");

const pozisyonSema = new mongoose.Schema(
  {
    ad: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true, 
      lowercase: true,
    },
    is_active: { type: Boolean, default: true },
  },
  {
    collection: "Pozisyonlar",
    timestamps: true,
  }
);

pozisyonSema.pre("save", function (next) {
  const cleaned = this.ad.replace(/\s+/g, "");
  this.slug = slugify(cleaned, {
    lower: true, 
    strict: true,
  });

  next();
});

module.exports = mongoose.model("Pozisyonlar", pozisyonSema);
