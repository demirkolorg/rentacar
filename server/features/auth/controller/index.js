const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../user/model');
const Roles = require('../../../features/role/model');
const response = require('../../../helper/response');
const transactions = require('../../../lib/transactions');
const ENV = require('../../../config').env;
const { messages } = require('../messages');
const { blacklistedTokens } = require('../../../middlewares/auth');
const { pointname } = require('../admin');

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return response.error(res, null, null, pointname, transactions.login, messages.login.error);
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

    let payload = {
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + 86400 // Set token to expire in 1 day
    };

    let token = jwt.sign(payload, ENV.JWT.SECRET);
    let userData = {
      _id: user._id,
      ad: user.ad,
      soyad: user.soyad,
      email: user.email,
      roller: UserRoles,
      izinler: UserPermissions
    };
    data = { token: token, user: userData };

    return response.success(res, data, user._id, pointname, transactions.login, messages.login.ok);
  } catch (err) {
    return response.error(res, err, user._id, pointname, transactions.login, messages.login.error);
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Bearer token'dan token'ı alın

  try {
    blacklistedTokens.add(token);
    return response.success(res, messages.logout.ok, req.user?.id, pointname, transactions.logout, messages.logout.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.logout, messages.logout.error);
  }
};
exports.register = async (req, res) => {
  let body = req.body;
  try {
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
      sube: body.sube,
      created_by: '000000000000000000000000'
    });

    return response.success(res, data, createdUser._id, pointname, transactions.register, messages.register.ok);
  } catch (err) {
    return response.error(res, err, createdUser._id, pointname, transactions.register, messages.register.error);
  }
};
