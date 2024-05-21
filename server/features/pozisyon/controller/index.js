const Pozisyonlar = require('../model');
const response = require('../../../lib/response');
const pt = require('../../../lib/pointtype');
const messages = require('../messages');

exports.get = async (req, res) => {
  let body = req.body;
  try {
    let pozisyon = await Pozisyonlar.findOne({ _id: body._id });
    if (!pozisyon) {
      return response.error(res, messages.pozisyonYok);
    }

    return response.success(res, pozisyon, req.user?.email, pt.points.pozisyon, pt.types.get, messages.basarili, messages.pozisyon_get_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.getAll = async (req, res) => {
  let body = req.body;
  let query = req.query;
  try {
    let pozisyonlar = await Pozisyonlar.find({ sube: body.sube }).find(query);

    return response.success(res, pozisyonlar, req.user?.email, pt.points.pozisyon, pt.types.get, messages.basarili, messages.pozisyon_getall_basarili);
  } catch (err) {
    return response.error(res);
  }
};

exports.add = async (req, res) => {
  let body = req.body;

  try {
    let createdPozisyon = await Pozisyonlar.create({
      ad: body.ad,
      created_by: req?.user?.id,
      sube: body.sube
    });

    return response.success(res, createdPozisyon, req?.user?.email, pt.points.pozisyon, pt.types.create, messages.basarili, messages.pozisyon_create_basarili);
  } catch (err) {
    if (err.code === 11000) {
      return response.error(res, 'Bu pozisyon adı zaten kullanılmakta.', 'Veri Hatası', 409);
    }

    return response.error(res);
  }
};
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let pozisyon = await Pozisyonlar.findOne({ _id: body._id });

    if (!pozisyon) {
      return response.error(res, messages.pozisyonYok);
    }

    let updates = {};
    if (body.ad) updates.ad = body.ad;
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await Pozisyonlar.updateOne({ _id: body._id }, updates);

    pozisyon = await Pozisyonlar.findOne({ _id: body._id });

    return response.success(res, pozisyon, req.user?.email, pt.points.pozisyon, pt.types.update, messages.basarili, messages.pozisyon_update_basarili);
  } catch (err) {
    if (err.code === 11000) {
      return response.error(res, 'Bu pozisyon adı zaten kullanılmakta.', 'Veri Hatası', 409);
    }

    return response.error(res);
  }
};
exports.delete = async (req, res) => {
  let body = req.body;
  try {
    let pozisyon = await Pozisyonlar.findOne({ _id: body._id });

    if (!pozisyon) {
      return response.error(res, messages.pozisyonYok);
    }

    await Pozisyonlar.deleteOne({ _id: body._id });

    return response.success(res, {}, req.user?.email, pt.points.pozisyon, pt.types.delete, messages.basarili, messages.pozisyon_delete_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.durumDegistir = async (req, res) => {
  let body = req.body;
  try {
    let pozisyon = await Pozisyonlar.findOne({ _id: body._id });

    if (!pozisyon) {
      return response.error(res, messages.pozisyonYok);
    }

    let updates = {};
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await Pozisyonlar.updateOne({ _id: body._id }, updates);

    pozisyon = await Pozisyonlar.findOne({ _id: body._id });

    return response.success(res, pozisyon, req.user?.email, pt.points.pozisyon, pt.types.update, messages.basarili, messages.pozisyon_durum_basarili);
  } catch (err) {
    return response.error(res);
  }
};
