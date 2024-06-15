const AuditLogs = require('./AuditLogs');

function logger(user_id, location, proc_type, data) {
  AuditLogs.info({ user_id: user_id, location: location, proc_type: proc_type, log: { ...data } });
}

module.exports = { logger };
