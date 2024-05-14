//dış
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const mongoose = require("mongoose");

//iç
const Users = require("../../user/model");
const Roles = require("../../../features/role/model");
const response = require("../../../lib/response");
const pt = require("../../../lib/pointtype");
const EnvConfig = require("../../../config/env.config");
const messages = require("../messages");

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return response.error(res, messages.VALIDATE_FIELD_BEFORE_AUTH);
    }

    let userRoles = await Roles.find({ _id: user.roller });

    const rolsSet = new Set();
    const permissionsSet = new Set();

    userRoles.forEach((role) => {
      rolsSet.add(role.name);
      role.permissions.forEach((permission) => {
        permissionsSet.add(permission);
      });
    });
    const UserRoles = [...rolsSet];
    const UserPermissions = [...permissionsSet];

    let payload = {
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + 86400, // Set token to expire in 1 day
    };
    let token = jwt.encode(payload, EnvConfig.JWT.SECRET);
    let userData = {
      _id: user._id,
      ad: user.ad,
      soyad: user.soyad,
      email: user.email,
      roller: UserRoles,
      izinler: UserPermissions,
    };

    return response.success(
      res,
      { token: token, user: userData },
      req.body.email,
      pt.points.auth,
      pt.types.login,
      messages.basarili,
      messages.AUTH_SUCCESSFUL_DESC
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.register = async (req, res) => {
  let body = req.body;
  try {
    if (body.roller && Array.isArray(body.roller) && body.roller.length > 0) {
      const bulunanRoller = await Roles.find({
        _id: { $in: body.roller },
      });

      if (bulunanRoller.length !== body.roller.length) {
        return response.error(res, messages.rollerYok);
      }
    }

    let password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);

    let createdUser = await Users.create({
      tc: body.tc,
      ad: body.ad,
      soyad: body.soyad,
      email: body.email,
      password: password,
      roller: body.roller,
      is_active: body.is_active,
    });

    return response.success(
      res,
      createdUser,
      body.email,
      pt.points.auth,
      pt.types.register,
      messages.basarili,
      messages.AUTH_SUCCESSFUL_DESC
    );
  } catch (err) {
    return response.error(res);
  }
};
