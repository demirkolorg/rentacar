const AuditLogsModel = require('../model');
const Enum = require("../../../config").ENUM;

let instance = null;

class AuditLogs {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  info({ user_id, location, transaction, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.INFO,
      user_id,
      location,
      transaction,
      log,
    });
  }
  error({ user_id, location, transaction, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.ERROR,
      user_id,
      location,
      transaction,
      log,
    });
  }
  warn({ user_id, location, transaction, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.WARN,
      user_id,
      location,
      transaction,
      log,
    });
  }
  debug({ user_id, location, transaction, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.DEBUG,
      user_id,
      location,
      transaction,
      log,
    });
  }
  verbose({ user_id, location, transaction, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.VERBOSE,
      user_id,
      location,
      transaction,
      log,
    });
  }
  http({ user_id, location, transaction, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.HTTP,
      user_id,
      location,
      transaction,
      log,
    });
  }

  #saveToDb({ level, user_id, location, transaction, log }) {
    AuditLogsModel.create({
      level,
      user_id,
      location,
      transaction,
      log,
    });
  }
}

module.exports = new AuditLogs();
