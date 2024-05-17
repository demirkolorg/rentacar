const mongoose = require('mongoose');
const Subeler = require('@features/sube/model');
const ObjectId = mongoose.Schema.Types.ObjectId;
const base = require('@features/base/model/base.js');

const baseSubeler = new mongoose.Schema({
  subeler: [{ type: ObjectId, required: true, ref: Subeler }]
});
baseSubeler.add(base);

module.exports = baseSubeler;
