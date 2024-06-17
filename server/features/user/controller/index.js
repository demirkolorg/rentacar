const bcrypt = require('bcrypt');
const Roles = require('@features/role/model');
const response = require('@helper/response');
const transactions = require('../../../lib/transactions');
const model = require('../model');
const { messages } = require('../messages');
const { get, getWithPopulate, getIds, getIdsWithPopulate, list, listWithPopulate, add, update, active, passive, archive, unarchive, softDelete, restore, hardDelete } = require('@base/controller');
const { pointname } = require('../admin');


exports.add = async (req, res) => {
  let body = req.body;
  try {
    let user = await model.findOne({
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

    let createdUser = await model.create({
      tc: body.tc,
      ad: body.ad,
      soyad: body.soyad,
      email: body.email,
      password: password,
      roller: body.roller,
      tip: body.tip,
      is_active: body.is_active
    });

    return response.success(res, createdUser, req.user?.id, pointname, transactions.add, messages.add.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.add, messages.add.error);
  }
};
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let user = await model.findOne({
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

    await model.updateOne(
      {
        $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
      },
      updates
    );
    user = await model.findOne({
      $or: [{ _id: body._id }, { email: body.email }, { tc: body.tc }]
    });

    return response.success(res, user, req.user?.id, pointname, transactions.update, messages.update.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.update, messages.update.error);
  }
};
exports.getUser = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await model.findOne({
      $or: [{ _id: body.id }, { email: body.email }, { tc: body.tc }]
    });

    if (!user) {
      return response.error(res, messages.kullaniciYok);
    }

    return response.success(res, user, req.user?.id, pointname, transactions.get, messages.get.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.get, messages.get.error);
  }
};
exports.getUserRoles = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await model.findOne({
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

    return response.success(res, UserRoles, req.user?.id, pointname, transactions.list, messages.list.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.list, messages.list.error);
  }
};
exports.getUserPermissions = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await model.findOne({
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

    return response.success(res, UserPermissions, req.user?.id, pointname, transactions.list, messages.list.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.list, messages.list.error);
  }
};
exports.getUserRolesAndPermissions = async (req, res) => {
  let body = req.body;
  try {
    const fields = [body.id, body.email, body.tc].filter(Boolean);
    if (fields.length !== 1) {
      return response.error(res, messages.birdenfazlakosul);
    }

    let user = await model.findOne({
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

    let data = { UserRoles, UserPermissions };
    return response.success(res, data, req.user?.id, pointname, transactions.list, messages.list.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.list, messages.list.error);
  }
};


// #region Base Controller Tanımlamaları

const props = (req, res) => ({ model, req, res, messages, pointname });

exports.get = async (req, res) => {
  return get(props(req, res));
};
exports.getWithPopulate = async (req, res) => {
  return getWithPopulate(props(req, res));
};
exports.getIds = async (req, res) => {
  return getIds(props(req, res));
};
exports.getIdsWithPopulate = async (req, res) => {
  return getIdsWithPopulate(props(req, res));
};
exports.list = async (req, res) => {
  filter = { sube: req.body.sube, is_delete: false };
  return list(filter, props(req, res));
};
exports.listWithPopulate = async (req, res) => {
  filter = { sube: req.body.sube, is_delete: false };
  return listWithPopulate(filter, props(req, res));
};

exports.active = async (req, res) => {
  return active(props(req, res));
};
exports.passive = async (req, res) => {
  return passive(props(req, res));
};
exports.archive = async (req, res) => {
  return archive(props(req, res));
};
exports.unarchive = async (req, res) => {
  return unarchive(props(req, res));
};
exports.softDelete = async (req, res) => {
  return softDelete(props(req, res));
};
exports.restore = async (req, res) => {
  return restore(props(req, res));
};
exports.hardDelete = async (req, res) => {
  return hardDelete(props(req, res));
};

// #endregion
