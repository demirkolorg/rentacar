const message = require('./message');
const { logger } = require('../log');

class Response {
  constructor() {}

  static logger(data, email, point, type) {
    logger(email, point, type, data);
  }

  static success(res, data, user_id, point, type, message) {
    logger(user_id, point, type, data);
    res.status(200).json({ success: true, message, data });
  }

  static error(res, message, code = 400) {
    res.status(code).json({ success: false, message });
  }
}

module.exports = Response;
