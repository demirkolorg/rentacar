const AuditLogs = require('./AuditLogs');

function infoLogger(user_id, location, transaction, data) {
  AuditLogs.info({ user_id: user_id, location: location, transaction: transaction, log: data });
}

function errorLogger(user_id, location, transaction, error) {
  AuditLogs.error({ user_id: user_id, location: location, transaction: transaction, log: error });
}
module.exports = { infoLogger, errorLogger };
