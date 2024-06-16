const response = require('../../../helper/response');
const messages = require('../messages');
const Roles = require('../model');
const { pointname } = require('../model');
const transactions = require('../../../lib/transactions');

exports.add = async (req, res) => {
  let body = req.body;
  try {
    let createdRole = await Roles.create({
      name: body.name,
      permissions: body.permissions,
      is_active: body.is_active,
      sube: body.sube,
      created_by: '000000000000000000000000'
    });

    return response.success(res, createdRole, req.user?.id, pointname, transactions.create,  messages.create_basarili);
  } catch (err) {
    return response.error(res);
  }
};
