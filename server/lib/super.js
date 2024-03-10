const bcrypt = require("bcrypt");
const Enum = require("../config/enum.config");
const Roles = require("../features/role/model");
const Users = require("../features/user/model");

exports.super = () => {
  let superRole = Roles.findOne({ name: Enum.ROLE_SUPER_ADMIN_NAME });

  if (superRole) return;

  let createdSuperAdminRole = Roles.create({
    name: Enum.ROLE_SUPER_ADMIN_NAME,
    permissions: [Enum.ROLE_SUPER_ADMIN_PERMISSION],
    is_active: true,
  });

  let password = bcrypt.hashSync(
    Enum.USER_SUPER_ADMIN_PASSWORD,
    bcrypt.genSaltSync(8),
    null
  );

  Users.create({
    tc: Enum.USER_SUPER_ADMIN_TC,
    ad: Enum.USER_SUPER_ADMIN_AD,
    soyad: Enum.USER_SUPER_ADMIN_SOYAD,
    email: Enum.USER_SUPER_ADMIN_EMAIL,
    password: password,
    roller: [createdSuperAdminRole._id],
    is_active: true,
  });
};
