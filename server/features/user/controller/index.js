const bcrypt = require('bcrypt');
const Roles = require('@features/role/model');
const response = require('@helper/response');
const Users = require('../model');
const messages = require('../messages');

const { pointname } = require('../model');
const transactions = require('../../../lib/transactions');

exports.add = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({
      $or: [{ email: body.email }, { tc: body.tc }]
    });

    if (user) {
      return response.error(res, messages.kullanicizatenvar);
    }
    if (body.roller && Array.isArray(body.roller) && body.roller.length > 0) {
      const bulunanRoller = await Roles.find({
        _id: { $in: body.roller }
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
      tip: body.tip,
      is_active: body.is_active
    });

    return response.success(res, createdUser, body.email, pointname, transactions.create,  messages.create_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let updates = {};
    if (body.password) {
      updates.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);
    }

    if (body.ad) updates.ad = body.ad;
    if (body.soyad) updates.soyad = body.soyad;
    if (body.roller && Array.isArray(body.roller)) updates.roller = body.roller;
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await Users.updateOne(
      {
        $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
      },
      updates
    );
    user = await Users.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
    });

    return response.success(res, user, req.user?.id, pointname, transactions.update,  messages.update_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.delete = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    await Users.deleteOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
    });

    return response.success(res, user, req.user?.id, pointname, transactions.harddelete,  messages.delete_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.durumDegistir = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({ _id: body._id });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let updates = {};
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await Users.updateOne({ _id: body._id }, updates);

    user = await Users.findOne({ _id: body._id });

    return response.success(res, user, req.user?.id, pt.points.user, transactions.update,  messages.durum_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.get = async (req, res) => {
  let body = req.body;
  try {
    let user = await Users.findOne({ _id: body._id });
    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    return response.success(res, user, req.user?.id, pt.points.user, transactions.get,  messages.pozisyon_get_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.getAll = async (req, res) => {
  let body = req.body;
  let query = req.query;
  try {
    let users = await Users.find({ sube: body.sube }).find(query);

    return response.success(res, users, req.user?.id, pt.points.user, transactions.list,  messages.getall_basarili);
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
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    return response.success(res, user, req.user?.id, pointname, transactions.get,  messages.getUser);
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
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let userRoles = await Roles.find({ _id: user.roller });

    const rolsSet = new Set();
    userRoles.forEach(role => {
      rolsSet.add(role.name);
    });

    const UserRoles = [...rolsSet];

    return response.success(res, UserRoles, req.user?.id, pointname, transactions.list,  messages.getUserRoles);
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
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let userRoles = await Roles.find({ _id: user.roller });
    const permissionsSet = new Set();
    userRoles.forEach(role => {
      role.permissions.forEach(permission => {
        permissionsSet.add(permission);
      });
    });
    const UserPermissions = [...permissionsSet];

    return response.success(res, UserPermissions, req.user?.id, pointname, transactions.list,  messages.getUserPermissions);
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
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    let userRoles = await Roles.find({ _id: user.roller });

    const rolsSet = new Set();
    const permissionsSet = new Set();

    userRoles.forEach(role => {
      rolsSet.add(role.name);
      role.permissions.forEach(permission => {
        permissionsSet.add(permission);
      });
    });
    const UserRoles = [...rolsSet];
    const UserPermissions = [...permissionsSet];

    return response.success(
      res,
      {
        UserRoles,
        UserPermissions
      },
      req.user?.id,
      pointname,
      transactions.list,
      
      messages.getUserRolesAndPermissions
    );
  } catch (err) {
    return response.error(res);
  }
};