const FirmaPersoneller = require('../model');
const response = require('../../../lib/response');
const messages = require('../messages');

const transactions = require('../../../lib/transactions');

const { pointname } = require('../model');
exports.get = async (req, res) => {
  let body = req.body;
  try {
    let firmaPersonel = await FirmaPersoneller.findOne({ _id: body._id });
    if (!firmaPersonel) {
      return response.error(res, messages.Yok);
    }

    return response.success(res, firmaPersonel, req.user?.id, pointname, transactions.get, messages.get_basarili);
  } catch (err) {
    return response.error(res);
  }
};
exports.getAll = async (req, res) => {
  let body = req.body;
  let query = req.query;

  try {
    let firmaPersonellar = await FirmaPersoneller.find(query);

    return response.success(
      res,
      firmaPersonellar,
      req.user?.id,
      pointname,
      transactions.list,

      messages.getall_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.add = async (req, res) => {
  let body = req.body;

  try {
    let createdFirmaPersonel = await FirmaPersoneller.create({
      firma: body.firma, // Firma ID'si
      pozisyon: body.pozisyon, // Pozisyon ID'si
      user: body.user, // Kullanıcı ID'si
      is_active: body.is_active !== undefined ? body.is_active : true, // Aktiflik durumu
      baslangicTarihi: body.baslangicTarihi, // Başlangıç tarihi
      bitisTarihi: body.bitisTarihi // Bitiş tarihi (opsiyonel)
    });

    return response.success(
      res,
      createdFirmaPersonel,
      req.user.email,
      pointname,
      transactions.create,

      messages.create_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.update = async (req, res) => {
  let body = req.body;
  try {
    let firmaPersonel = await FirmaPersoneller.findOne({ _id: body._id });

    if (!firmaPersonel) {
      return response.error(res, messages.Yok);
    }

    let updates = {};
    if (body.firma) updates.firma = body.firma;
    if (body.pozisyon) updates.pozisyon = body.pozisyon;
    if (body.user) updates.user = body.user;
    if (body.baslangicTarihi) updates.baslangicTarihi = body.baslangicTarihi;
    if (body.bitisTarihi) updates.bitisTarihi = body.bitisTarihi;
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await FirmaPersonelleri.updateOne({ _id: body._id }, updates);

    firmaPersonel = await FirmaPersonelleri.findOne({ _id: body._id });
    return response.success(
      res,
      firmaPersonel,
      req.user?.id,
      pointname,
      transactions.update,

      messages.update_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.delete = async (req, res) => {
  let body = req.body;
  try {
    let firmaPersonel = await FirmaPersoneller.findOne({ _id: body._id });

    if (!firmaPersonel) {
      return response.error(res, messages.Yok);
    }

    await FirmaPersoneller.deleteOne({ _id: body._id });

    return response.success(
      res,
      {},
      req.user?.id,
      pointname,
      transactions.harddelete,

      messages.delete_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
exports.durumDegistir = async (req, res) => {
  let body = req.body;
  try {
    let firmaPersonel = await FirmaPersoneller.findOne({ _id: body._id });

    if (!firmaPersonel) {
      return response.error(res, messages.Yok);
    }

    let updates = {};
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    await FirmaPersoneller.updateOne({ _id: body._id }, updates);

    firmaPersonel = await FirmaPersoneller.findOne({ _id: body._id });

    return response.success(
      res,
      firmaPersonel,
      req.user?.id,
      pointname,
      transactions.update,

      messages.durum_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
