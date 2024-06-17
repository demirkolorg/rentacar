const model = require('../model');
const { messages } = require('../messages');
const { get, getWithPopulate, getIds, getIdsWithPopulate, list, listWithPopulate, add, update, active, passive, archive, unarchive, softDelete, restore, hardDelete } = require('@base/controller');
const { pointname } = require('../admin');


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

exports.add = async (req, res) => {
  let body = req.body;
  let data = {
    ad: body.ad,
    firmaId: body.firmaId,
    logoUrl: body.logoUrl,
    adres: body.adres,
    iletisim: body.iletisim,
    ekBilgiler: body.ekBilgiler
  };
  return add(data, props(req, res));
};
exports.update = async (req, res) => {
  let body = req.body;
  let data = {};
  if (body.firmaId) data.firmaId = body.firmaId;
  if (body.ad) data.ad = body.ad;
  if (body.adres) data.adres = body.adres;
  if (body.iletisim) data.iletisim = body.iletisim;
  if (body.ekBilgiler) data.ekBilgiler = body.ekBilgiler;
  if (body.logoUrl) data.logoUrl = body.logoUrl;
  if (typeof body.is_active === 'boolean') data.is_active = body.is_active;
  return update(data, props(req, res));
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
