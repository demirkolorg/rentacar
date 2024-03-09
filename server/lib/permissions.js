const user = require("../features/user/key");
const role = require("../features/role/key");
const auth = require("../features/auth/key");
const auditLogs = require("../features/AuditLogs/key");

module.exports = {
  privGroups: [
    { id: "AUTH", name: "Auth Permissions" },
    { id: "USERS", name: "User Permissions" },
    { id: "ROLES", name: "Role Permissions" },
    { id: "AUTDITLOGS", name: "AuditLog Permissions" },
  ],
  privileges: [...auth, ...user, ...role, ...auditLogs],
};
