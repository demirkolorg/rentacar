const AuditLogsModel = require('../features/AuditLogs/model');
const Enum = require("../config/enum");

let instance = null;

class AuditLogs {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  info({ user_id, location, proc_type, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.INFO,
      user_id,
      location,
      proc_type,
      log,
    });
  }
  error({ user_id, location, proc_type, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.ERROR,
      user_id,
      location,
      proc_type,
      log,
    });
  }
  warn({ user_id, location, proc_type, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.WARN,
      user_id,
      location,
      proc_type,
      log,
    });
  }
  debug({ user_id, location, proc_type, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.DEBUG,
      user_id,
      location,
      proc_type,
      log,
    });
  }
  verbose({ user_id, location, proc_type, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.VERBOSE,
      user_id,
      location,
      proc_type,
      log,
    });
  }
  http({ user_id, location, proc_type, log }) {
    this.#saveToDb({
      level: Enum.LOG_LEVELS.HTTP,
      user_id,
      location,
      proc_type,
      log,
    });
  }

  #saveToDb({ level, user_id, location, proc_type, log }) {
    AuditLogsModel.create({
      level,
      user_id,
      location,
      proc_type,
      log,
    });
  }
}

module.exports = new AuditLogs();
