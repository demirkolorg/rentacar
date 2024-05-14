//dış
//iç
const Firmalar = require("../model");
const response = require("../../../lib/response");
const pt = require("../../../lib/pointtype");
const messages = require("../messages");

exports.get = async (req, res) => {
  let body = req.body;
  try {
    let firma = await Firmalar.findOne({ _id: body._id });
    if (!firma) {
      return response.error(res, messages.firmaYok);
    }

    return response.success(
      res,
      firma,
      req.user?.email,
      pt.points.firma,
      pt.types.get,
      messages.basarili,
      messages.firma_get_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.getAll = async (req, res) => {
  let body = req.body;
  let query = req.query;

  try {
    let firmalar = await Firmalar.find(query);

    return response.success(
      res,
      firmalar,
      req.user?.email,
      pt.points.firma,
      pt.types.get,
      messages.basarili,
      messages.firma_getall_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.add = async (req, res) => {
  let body = req.body;
  
  try {
    let createdFirma = await Firmalar.create({
      ad: body.ad,
      logoUrl: body.logoUrl,
      adres: body.adres,
      iletisim: body.iletisim,
      ekBilgiler: body.ekBilgiler,
    });


    return response.success(
      res,
      createdFirma,
      req.user.email,
      pt.points.firma,
      pt.types.create,
      messages.basarili,
      messages.firma_create_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let firma = await Firmalar.findOne({ _id: body._id });

    if (!firma) {
      return response.error(res, messages.firmaYok);
    }

    let updates = {};
    if (body.ad) updates.ad = body.ad;
    if (body.adres) updates.adres = body.adres;
    if (body.iletisim) updates.iletisim = body.iletisim;
    if (body.ekBilgiler) updates.ekBilgiler = body.ekBilgiler;
    if (body.logoUrl) updates.logoUrl = body.logoUrl;
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Firmalar.updateOne({ _id: body._id }, updates);

    firma = await Firmalar.findOne({ _id: body._id });

    return response.success(
      res,
      firma,
      req.user?.email,
      pt.points.firma,
      pt.types.update,
      messages.basarili,
      messages.firma_update_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.delete = async (req, res) => {
  let body = req.body;
  try {
    let firma = await Firmalar.findOne({ _id: body._id });

    if (!firma) {
      return response.error(res, messages.firmaYok);
    }

    await Firmalar.deleteOne({ _id: body._id });

    return response.success(
      res,
      {},
      req.user?.email,
      pt.points.firma,
      pt.types.delete,
      messages.basarili,
      messages.firma_delete_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.durumDegistir = async (req, res) => {
  let body = req.body;
  try {
    let firma = await Firmalar.findOne({ _id: body._id });

    if (!firma) {
      return response.error(res, messages.firmaYok);
    }

    let updates = {};
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

    await Firmalar.updateOne({ _id: body._id }, updates);

    firma = await Firmalar.findOne({ _id: body._id });

    return response.success(
      res,
      firma,
      req.user?.email,
      pt.points.firma,
      pt.types.update,
      messages.basarili,
      messages.firma_durum_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};