const model = require('../model');
const { messages } = require('../messages');
const { get, getIds, list, add, update, active, passive, archive, unarchive, softDelete, restore, hardDelete } = require('@base/controller');
const { pointname } = require('../admin');

const props = (req, res) => ({ model, req, res, messages, pointname });

exports.get = async (req, res) => {
  return get(props(req, res));
};
exports.getIds = async (req, res) => {
  return getIds(props(req, res));
};
exports.list = async (req, res) => {
  filter = { sube: req.body.sube, is_delete: false };
  return list(filter, props(req, res));
};

exports.add = async (req, res) => {
  let body = req.body;
  let data = {
    firma: body.firma, // Firma ID'si
    pozisyon: body.pozisyon, // Pozisyon ID'si
    user: body.user, // Kullanıcı ID'si
    is_active: body.is_active !== undefined ? body.is_active : true, // Aktiflik durumu
    baslangicTarihi: body.baslangicTarihi, // Başlangıç tarihi
    bitisTarihi: body.bitisTarihi // Bitiş tarihi (opsiyonel)
  };
  return add(data, props(req, res));
};
exports.update = async (req, res) => {
  let body = req.body;
  let data = {};
  if (body.firma) data.firma = body.firma;
  if (body.pozisyon) data.pozisyon = body.pozisyon;
  if (body.user) data.user = body.user;
  if (body.baslangicTarihi) data.baslangicTarihi = body.baslangicTarihi;
  if (body.bitisTarihi) data.bitisTarihi = body.bitisTarihi;
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
