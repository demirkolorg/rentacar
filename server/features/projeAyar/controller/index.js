const response = require("@lib/response");
const pt = require("@lib/pointtype");
const enumConfig = require("@config/enum.config");
const messages = require("../messages");

exports.superAdminMail = async (req, res) => {
  try {
    return response.success(
      res,
      enumConfig.USER_SUPER_ADMIN_EMAIL,
      req.user?.email,
      pt.points.projeAyar,
      pt.types.get,
      messages.basarili,
      messages.get_basarili
    );
  } catch (err) {
    return response.error(res);
  }
};
