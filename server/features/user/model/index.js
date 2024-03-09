//dış
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const is = require("is_js");
//kök
const Enum = require("../../../config/enum.config");
//iç
const messages = require("../messages");

const schema = new mongoose.Schema(
  {
    tc: { type: String, required: true, unique: true },
    ad: { type: String, required: true },
    soyad: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roller: [{ type: mongoose.SchemaTypes.ObjectId, required: true }],
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

class Users extends mongoose.Model {
  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema);
