const message = require("./message");
const { logger } = require("../log");

class Response {
  constructor() {}

  static logger(data, email, point, type) {
    logger(email, point, type, data);
  }

  static success(res, data, email, point, type, title, desc) {
    logger(email, point, type, data);
    res.status(200).json({
      success: true,
      message: {
        title,
        desc,
      },
      data,
    });
  }

  static error(
    res,
    desc = message.beklenmedikhata,
    title = message.hata,
    code = 400
  ) {
    res.status(code).json({
      success: false,
      code,
      message: {
        title,
        desc,
      },
    });
  }
}

module.exports = Response;
