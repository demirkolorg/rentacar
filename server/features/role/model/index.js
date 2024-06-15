const mongoose = require("mongoose");
const RolAyricaliklari = require("@lib/permissions");
const  baseSube = require('@features/base/model/baseSube.js');

const rolIzinleriListesi = RolAyricaliklari.privileges.map(
  (privilege) => privilege.key
);

const schema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [
      {
        type: String,
        required: true,
        enum: rolIzinleriListesi, 
      },
    ],
  },
  {
    collection: "Roller",
  }
);

schema.add(baseSube);
module.exports = mongoose.model("Roller", schema);
module.exports.pointname = 'Roller';
