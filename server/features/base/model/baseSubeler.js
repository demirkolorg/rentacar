const mongoose = require('mongoose');
const Subeler = require('@features/sube/model');
const ObjectId = mongoose.Schema.Types.ObjectId;
const base = require('@features/base/model/base.js');

const baseSubeler = new mongoose.Schema({
  documentinfo: {
    subeler: [{ type: ObjectId, required: true, ref: Subeler }]
  }
});
baseSubeler.add(base);

module.exports = baseSubeler;
