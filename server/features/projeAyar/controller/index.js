const response = require('@helper/response');
const messages = require('../messages');
const ENUM = require('../../../config').ENUM;

const { pointname } = require('../model');
const transactions = require('../../../lib/transactions');

exports.superAdminMail = async (req, res) => {
  try {
    return response.success(res, ENUM.USER_SUPER_ADMIN_EMAIL, req.user?.id, pointname, transactions.get, messages.get_basarili);
  } catch (err) {
    return response.error(res);
  }
};
