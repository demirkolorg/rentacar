const mongoose = require("mongoose");
const RolAyricaliklari = require("../../../lib/permissions");

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
        enum: rolIzinleriListesi, // Enum olarak kullanılıyor
      },
    ],
    is_active: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

class Roles extends mongoose.Model {}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);
