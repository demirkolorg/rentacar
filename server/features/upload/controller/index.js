const { messages } = require('../messages');
const { imageUpload, documentUpload, otherUpload } = require('@base/controller');
const { pointname } = require('../admin');

// #region Base Controller Tanımlamaları

const props = (req, res) => ({ req, res, messages, pointname });

exports.image = async (req, res) => {
  return imageUpload(props(req, res));
};
exports.document = async (req, res) => {
  return documentUpload(props(req, res));
};
exports.other = async (req, res) => {
  return otherUpload(props(req, res));
};
