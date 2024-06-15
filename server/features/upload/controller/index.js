const response = require('../../../lib/response');
const messages = require('../messages');

const { pointname } = require('../model');
const transactions = require('../../../lib/transactions');

exports.image = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, messages.dosyaYok);
    }

    return response.success(res, req.file.filename, req.user?.id, pointname, transactions.upload,  messages.image_basarili);
  } catch (err) {
    return response.error(res);
  }
};

exports.document = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, messages.dosyaYok);
    }

    return response.success(res, req.file.filename, req.user?.id, pointname, transactions.upload,  messages.document_basarili);
  } catch (err) {
    return response.error(res);
  }
};

exports.other = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, messages.dosyaYok);
    }

    return response.success(res, req.file.filename, req.user?.id, pointname, transactions.upload,  messages.other_basarili);
  } catch (err) {
    return response.error(res);
  }
};
