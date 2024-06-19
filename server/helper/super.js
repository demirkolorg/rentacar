const bcrypt = require('bcrypt');
const ENUM = require('../config').ENUM;
const Roles = require('../features/role/model');
const Users = require('../features/user/model');

exports.run = async () => {
  const superRoleData = {
    _id: ENUM.ROLE_SUPER_ADMIN_ID,
    name: ENUM.ROLE_SUPER_ADMIN_NAME,
    permissions: [ENUM.ROLE_SUPER_ADMIN_PERMISSION],
    documentinfo: {
      sube: ENUM.ROLE_SUPER_ADMIN_SUBE,
      is_active: false,
      is_archive: false,
      is_delete: false,
      created_by: ENUM.ROLE_SUPER_ADMIN_CREATED_BY,
      created_at: null,
      updated_at: null,
      versionKey: 0
    }
  };
  const superUserData = {
    _id: ENUM.USER_SUPER_ADMIN_ID,
    tc: ENUM.USER_SUPER_ADMIN_TC,
    ad: ENUM.USER_SUPER_ADMIN_AD,
    soyad: ENUM.USER_SUPER_ADMIN_SOYAD,
    email: ENUM.USER_SUPER_ADMIN_EMAIL,
    password: bcrypt.hashSync(ENUM.USER_SUPER_ADMIN_PASSWORD, bcrypt.genSaltSync(8), null),
    tip: ENUM.USER_SUPER_ADMIN_TIP,
    roller: [ENUM.ROLE_SUPER_ADMIN_ID],
    documentinfo: {
      sube: ENUM.USER_SUPER_ADMIN_SUBE,
      is_active: true,
      is_archive: false,
      is_delete: false,
      created_by: ENUM.USER_SUPER_ADMIN_CREATED_BY,
      created_at: null,
      updated_at: null,
      versionKey: 0
    }
  };

  let superRole = await Roles.findOne({ _id: ENUM.ROLE_SUPER_ADMIN_ID });
  if (!superRole) {
    await Roles.create(superRoleData);
  }

  let superUser = await Users.findOne({ _id: ENUM.USER_SUPER_ADMIN_ID });
  if (!superUser) {
    await Users.create(superUserData);
  }
};
