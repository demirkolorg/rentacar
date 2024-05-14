const response = require("../../../lib/response");
const pt = require("../../../lib/pointtype");
const messages = require("../messages");

exports.image = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, messages.dosyaYok);
    }

    return response.success(
      res,
      req.file.filename,
      req.user?.email,
      pt.points.upload,
      pt.types.upload,
      messages.basarili,
      messages.image_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.document = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, messages.dosyaYok);
    }

    return response.success(
      res,
      req.file.filename,
      req.user?.email,
      pt.points.upload,
      pt.types.upload,
      messages.basarili,
      messages.document_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};

exports.other = async (req, res) => {
  try {
    if (!req.file) {
      return response.error(res, messages.dosyaYok);
    }

    return response.success(
      res,
      req.file.filename,
      req.user?.email,
      pt.points.upload,
      pt.types.upload,
      messages.basarili,
      messages.other_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
