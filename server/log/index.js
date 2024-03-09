const Logger = require("./loggerClass");
const AuditLogs = require("./AuditLogs");

function logger(email, location, proc_type, data) {
  AuditLogs.info({
    email: email,
    location: location,
    proc_type: proc_type,
    log: { ...data },
  });

//   Logger.info(email, location, proc_type, data);
}

module.exports = { logger };
