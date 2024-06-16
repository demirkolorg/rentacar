const bcrypt = require('bcrypt');
const ENUM = require('../config').ENUM;
const Roles = require('../features/role/model');
const Users = require('../features/user/model');

exports.run = () => {
  let superRole = Roles.findOne({ name: ENUM.ROLE_SUPER_ADMIN_NAME });
  if (superRole) return;
  let createdSuperAdminRole = Roles.create({ name: ENUM.ROLE_SUPER_ADMIN_NAME, permissions: [ENUM.ROLE_SUPER_ADMIN_PERMISSION], is_active: true });
  let password = bcrypt.hashSync(ENUM.USER_SUPER_ADMIN_PASSWORD, bcrypt.genSaltSync(8), null);

  Users.create({
    tc: ENUM.USER_SUPER_ADMIN_TC,
    ad: ENUM.USER_SUPER_ADMIN_AD,
    soyad: ENUM.USER_SUPER_ADMIN_SOYAD,
    email: ENUM.USER_SUPER_ADMIN_EMAIL,
    password: password,
    roller: [createdSuperAdminRole._id],
    is_active: true
  });
};
