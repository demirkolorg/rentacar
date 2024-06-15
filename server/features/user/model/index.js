const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const baseSube = require('@features/base/model/baseSube.js');

// const USER_TYPES = {
//   All: 'All',
//   Grifin: 'Grifin',
//   Firma: 'Firma',
//   Sube: 'Sube'
// };

const schema = new mongoose.Schema(
  {
    tc: { type: String, required: true, unique: true },
    ad: { type: String, required: true },
    soyad: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roller: [{ type: mongoose.SchemaTypes.ObjectId, required: true }],
    tip: { type: String, required: true }
  },
  { collection: 'Kullanicilar' }
);

schema.add(baseSube);

class Users extends mongoose.Model {
  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

schema.loadClass(Users);
module.exports = mongoose.model('Kullanicilar', schema);
module.exports.pointname = 'Kullanicilar';
