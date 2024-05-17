const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Base Schema
const base = new mongoose.Schema(
  {
    is_active: { type: Boolean, default: true },
    created_by: { type: ObjectId, required: true },
    updated_by: { type: ObjectId }
  },
  { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);


module.exports =  base
