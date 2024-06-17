const response = require('@helper/response');
const { messages } = require('../messages');
const ENUM = require('../../../config').ENUM;


const transactions = require('../../../lib/transactions');
const { pointname } = require('../admin');

exports.superAdminMail = async (req, res) => {
  try {

    
    return response.success(res, ENUM.USER_SUPER_ADMIN_EMAIL, req.user?.id, pointname, transactions.get, messages.get.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.add, messages.add.error);
  }
};




