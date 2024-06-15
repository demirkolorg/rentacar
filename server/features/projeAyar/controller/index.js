const response = require('@lib/response');
const enumConfig = require('@config/enum.config');
const messages = require('../messages');

const { pointname } = require('../model');
const transactions = require('../../../lib/transactions');

exports.superAdminMail = async (req, res) => {
  try {
    return response.success(res, enumConfig.USER_SUPER_ADMIN_EMAIL, req.user?.id, pointname, transactions.get,  messages.get_basarili);
  } catch (err) {
    return response.error(res);
  }
};
