const { add, update, get, getAll, active, passive, archive, unarchive, softDelete, restore, hardDelete } = require('@base/controller');
const response = require('@lib/response');
const { messages } = require('../messages');
const Pozisyonlar = require('../model');
const { pointname } = require('../model');

const props = (req, res) => ({ Model: Pozisyonlar, req, res, messages, pointname });

exports.add = async (req, res) => {
  let body = req.body;
  let data = {
    ad: body.ad,
    created_by: req?.user?.id,
    sube: body.sube
  };
  return add(data, props(req, res));
};
exports.update = async (req, res) => {
  let body = req.body;
  let data = {};
  if (body.ad) data.ad = body.ad;
  if (typeof body.is_active === 'boolean') data.is_active = body.is_active;
  return update(data, props(req, res));
};

exports.get = async (req, res) => {
  return get(props(req, res));
};
exports.getAll = async (req, res) => {
  filter = { sube: req.body.sube, is_delete: false };
  return getAll(filter, props(req, res));
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
