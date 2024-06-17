const mongoose = require('mongoose');
const slugify = require('slugify');
const baseSube = require('@features/base/model/baseSube.js');

const schema = new mongoose.Schema(
  {
    ad: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true }
  },
  { collection: 'Pozisyonlar' }
);
schema.add(baseSube);

schema.pre('save', function (next) {
  const cleaned = this.ad.replace(/\s+/g, '');
  this.slug = slugify(cleaned, {
    lower: true,
    strict: true
  });

  next();
});

module.exports = mongoose.model('Pozisyonlar', schema);
