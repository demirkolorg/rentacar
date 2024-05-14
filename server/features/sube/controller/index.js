const Subeler = require("../model");
const response = require("../../../lib/response");
const pt = require("../../../lib/pointtype");
const messages = require("../messages");

exports.get = async (req, res) => {
  let body = req.body;
  try {
    let sube = await Subeler.findOne({ _id: body._id }).populate("firmaId");
    if (!sube) {
      return response.error(res, messages.subeYok);
    }

    return response.success(
      res,
      sube,
      req.user?.email,
      pt.points.sube,
      pt.types.get,
      messages.basarili,
      messages.sube_get_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.getAll = async (req, res) => {
  let body = req.body;
  let query = req.query;

  try {
    let subeler = await Subeler.find(query).populate("firmaId");

    return response.success(
      res,
      subeler,
      req.user?.email,
      pt.points.sube,
      pt.types.get,
      messages.basarili,
      messages.sube_getall_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.add = async (req, res) => {
  let body = req.body;

  try {
    let createdSube = await Subeler.create({
      ad: body.ad,
      firmaId: body.firmaId,
      logoUrl: body.logoUrl,
      adres: body.adres,
      iletisim: body.iletisim,
      ekBilgiler: body.ekBilgiler,
    });

    return response.success(
      res,
      createdSube,
      req.user.email,
      pt.points.sube,
      pt.types.create,
      messages.basarili,
      messages.sube_create_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let sube = await Subeler.findOne({ _id: body._id });

    if (!sube) {
      return response.error(res, messages.subeYok);
    }

    let updates = {};
    if (body.firmaId) updates.firmaId = body.firmaId;
    if (body.ad) updates.ad = body.ad;
    if (body.adres) updates.adres = body.adres;
    if (body.iletisim) updates.iletisim = body.iletisim;
    if (body.ekBilgiler) updates.ekBilgiler = body.ekBilgiler;
    if (body.logoUrl) updates.logoUrl = body.logoUrl;
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Subeler.updateOne({ _id: body._id }, updates);

    sube = await Subeler.findOne({ _id: body._id });

    return response.success(
      res,
      sube,
      req.user?.email,
      pt.points.sube,
      pt.types.update,
      messages.basarili,
      messages.sube_update_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.delete = async (req, res) => {
  let body = req.body;
  try {
    let sube = await Subeler.findOne({ _id: body._id });

    if (!sube) {
      return response.error(res, messages.subeYok);
    }

    await Subeler.deleteOne({ _id: body._id });

    return response.success(
      res,
      {},
      req.user?.email,
      pt.points.sube,
      pt.types.delete,
      messages.basarili,
      messages.sube_delete_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.durumDegistir = async (req, res) => {
  let body = req.body;
  try {
    let sube = await Subeler.findOne({ _id: body._id });

    if (!sube) {
      return response.error(res, messages.subeYok);
    }

    let updates = {};
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Subeler.updateOne({ _id: body._id }, updates);

    sube = await Subeler.findOne({ _id: body._id });

    return response.success(
      res,
      sube,
      req.user?.email,
      pt.points.sube,
      pt.types.update,
      messages.basarili,
      messages.sube_durum_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
