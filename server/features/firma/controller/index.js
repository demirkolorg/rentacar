const response = require('../../../helper/response');
const transactions = require('../../../lib/transactions');
const Subeler = require('../../sube/model'); // Şube modeli

const model = require('../model');
const { messages } = require('../messages');
const { get, getIds, list, add, update, active, passive, archive, unarchive, softDelete, restore, hardDelete } = require('@base/controller');
const { pointname } = require('../admin');

exports.add = async (req, res) => {
  let body = req.body;

  try {
    let documentinfo = {
      created_by: req?.user?.id,
      sube: body.sube,
      is_active: true,
      is_delete: false,
      is_archive: false
    };
    let createdFirma = await model.create({
      ad: body.ad,
      logoUrl: body.logoUrl,
      adres: body.adres,
      iletisim: body.iletisim,
      ekBilgiler: body.ekBilgiler,
      documentinfo: documentinfo
    });

    // Şube kontrolü: Firma için şube sayısını kontrol et
    const subeCount = await Subeler.countDocuments({ firmaId: createdFirma._id });
    if (subeCount === 0) {
      // Hiç şube yoksa, Merkez Şube oluştur
      await Subeler.create({
        firmaId: createdFirma._id,
        ad: createdFirma.ad + ' Merkez Şubesi',
        logoUrl: createdFirma.logoUrl,
        adres: createdFirma.adres,
        iletisim: createdFirma.iletisim,
        ekBilgiler: body.ekBilgiler,
        is_active: true,
        created_by: req?.user?.id
      });
    }

    return response.success(res, createdFirma, req.user?.id, pointname, transactions.add, messages.add.ok);
  } catch (err) {
    return response.error(res, err, req.user?.id, pointname, transactions.add, messages.add.error);
  }
};

// #region Base Controller Tanımlamaları

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
exports.update = async (req, res) => {
  let data = {};
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
