const logger = require("./logger");
let instance = null;

class LoggerClass {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  #createLogObject(user_id, location, proc_type, log) {
    return { user_id, location, proc_type, log };
  }

  info(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.info(logs);
  }
  warn(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.warn(logs);
  }
  error(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.error(logs);
  }
  verbose(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.verbose(logs);
  }
  silly(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.silly(logs);
  }
  http(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.http(logs);
  }
  debug(user_id, location, proc_type, log) {
    let logs = this.#createLogObject(user_id, location, proc_type, log);
    logger.debug(logs);
  }
}

module.exports = new LoggerClass();
