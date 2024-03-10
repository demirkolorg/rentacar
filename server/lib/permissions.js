const Enum = require("../config/enum.config");
const user = require("../features/user/key");
const role = require("../features/role/key");
const auth = require("../features/auth/key");
const auditLogs = require("../features/AuditLogs/key");

module.exports = {
  privGroups: [
    { id: "ADMIN", name: "Full Permissions" },
    { id: "AUTH", name: "Auth Permissions" },
    { id: "USERS", name: "User Permissions" },
    { id: "ROLES", name: "Role Permissions" },
    { id: "AUTDITLOGS", name: "AuditLog Permissions" },
  ],
  privileges: [
    {
      key: Enum.ROLE_SUPER_ADMIN_PERMISSION,
      name: "SUPER ADMIN FULL",
      group: "ADMIN",
      description: "Tüm endpointlere full yetkilidir",
    },
    ,
    ...auth,
    ...user,
    ...role,
    ...auditLogs,
  ],
};
