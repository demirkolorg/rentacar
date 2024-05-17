const mongoose = require('mongoose');
const Subeler = require('@features/sube/model');
const ObjectId = mongoose.Schema.Types.ObjectId;
const base = require('@features/base/model/base.js');

const baseSube = new mongoose.Schema({
  sube: { type: ObjectId, required: true, ref: Subeler }
});
baseSube.add(base);

module.exports = baseSube;
