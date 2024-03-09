//dış
const bcrypt = require("bcrypt");
//iç
const mongoose = require("mongoose");
const Users = require("../model");
const Roles = require("../../../features/role/model");
const response = require("../../../lib/response");
const pt = require("../../../lib/pointtype");
const { logger } = require("../../../log");
const messages = require("../messages");

exports.add = async (req, res) => {
  let body = req.body;
  try {
    let user1 = await Users.findOne({ email: body.email });
    let user2 = await Users.findOne({ tc: body.tc });

    if (user1 || user2) {
      return response.error(res, messages.kullanicizatenvar);
    }
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
      pt.points.users,
      pt.types.create,
      messages.basarili,
      messages.user_create_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.getUserRoles = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await Users.findOne({
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }],
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let userRoles = await Roles.find({ _id: user.roller });

    const rolsSet = new Set();
    userRoles.forEach((role) => {
      rolsSet.add(role.name);
    });

    const UserRoles = [...rolsSet];

    return response.success(
      res,
      UserRoles,
      req.user?.email,
      pt.points.users,
      pt.types.list,
      messages.basarili,
      messages.getUserRoles
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.getUserPermissions = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await Users.findOne({
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }],
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let userRoles = await Roles.find({ _id: user.roller });
    const permissionsSet = new Set();
    userRoles.forEach((role) => {
      role.permissions.forEach((permission) => {
        permissionsSet.add(permission);
      });
    });
    const UserPermissions = [...permissionsSet];


    

    return response.success(
      res,
      UserPermissions,
      req.user?.email,
      pt.points.users,
      pt.types.list,
      messages.basarili,
      messages.getUserPermissions
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.getUserRolesAndPermissions = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await Users.findOne({
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }],
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
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


    

    return response.success(
      res,
      {
        UserRoles,
        UserPermissions,
      },
      req.user?.email,
      pt.points.users,
      pt.types.list,
      messages.basarili,
      messages.getUserRolesAndPermissions
    );
  } catch (err) {
    return response.error(res);
  }
};
