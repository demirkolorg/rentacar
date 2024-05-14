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
    let user = await Users.findOne({
      $or: [{ email: body.email }, { tc: body.tc }],
    });

    if (user) {
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
// Id, tc ya da email bilgileri verilen kullanıcının bilgilerini günceller,
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }],
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let updates = {};
    if (body.password) {
      updates.password = bcrypt.hashSync(
        body.password,
        bcrypt.genSaltSync(8),
        null
      );
    }

    if (body.ad) updates.ad = body.ad;
    if (body.soyad) updates.soyad = body.soyad;
    if (body.roller && Array.isArray(body.roller)) updates.roller = body.roller;
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Users.updateOne(
      {
        $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }],
      },
      updates
    );
    user = await Users.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }],
    });

    return response.success(
      res,
      user,
      req.user?.email,
      pt.points.users,
      pt.types.update,
      messages.basarili,
      messages.user_update_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

// Id, tc ya da email bilgileri verilen kullanıcıyı siler,
exports.delete = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }],
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    await Users.deleteOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }],
    });

    
    return response.success(
      res,
      user,
      req.user?.email,
      pt.points.users,
      pt.types.delete,
      messages.basarili,
      messages.user_delete_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.getUser = async (req, res) => {
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

    return response.success(
      res,
      user,
      req.user?.email,
      pt.points.users,
      pt.types.list,
      messages.basarili,
      messages.getUser
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
