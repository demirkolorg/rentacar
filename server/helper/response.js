const { infoLogger, errorLogger } = require('../features/AuditLogs/log');

class Response {
  constructor() {}

  static success(res, data, user_id, point, type, message) {
    infoLogger(user_id, point, type, data);
    res.status(200).json({ success: true, message, data });
  }

  static error(res, error, user_id, point, type, message, code = 400) {
    errorLogger(user_id, point, type, error);
    res.status(code).json({ success: false, message });
  }
}

module.exports = Response;
