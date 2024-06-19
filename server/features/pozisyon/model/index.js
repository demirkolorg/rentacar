const mongoose = require('mongoose');
const slugify = require('slugify');
const base = require('@features/base/model/base.js');

const schema = new mongoose.Schema(
  {
    ad: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true }
  },
  { collection: 'Pozisyonlar' }
);
schema.add(base);

schema.pre('save', function (next) {
  const cleaned = this.ad.replace(/\s+/g, '');
  this.slug = slugify(cleaned, { lower: true, strict: true });
  next();
});

schema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.ad) {
    const cleaned = update.$set.ad.replace(/\s+/g, '');
    update.$set.slug = slugify(cleaned, {
      lower: true,
      strict: true
    });
  }
  next();
});

module.exports = mongoose.model('Pozisyonlar', schema);
