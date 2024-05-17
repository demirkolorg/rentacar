const Enum = require('@config/enum.config');
// const user = require('@features/user/key/index.js');
// const role = require('@features/role/key/index.js');
// const auth = require('@features/auth/key/index.js');
// const auditLogs = require('@features/AuditLogs/key/index.js');
const loadKeys = require('./loadKeys'); // loadKeys fonksiyonunu dahil edin
const path = require('path');

// @features klasöründeki tüm key/index.js dosyalarını yükleyin
const featuresPath = path.join(__dirname, '../features');
const featureKeys = loadKeys(featuresPath);

module.exports = {
  privGroups: [
    { id: 'ADMIN', name: 'Full Permissions' },
    { id: 'AUTH', name: 'Auth Permissions' },
    { id: 'USERS', name: 'User Permissions' },
    { id: 'ROLES', name: 'Role Permissions' },
    { id: 'AUTDITLOGS', name: 'AuditLog Permissions' }
  ],
  privileges: [
    {
      key: Enum.ROLE_SUPER_ADMIN_PERMISSION,
      name: 'SUPER ADMIN FULL',
      group: 'ADMIN',
      description: 'Tüm endpointlere full yetkilidir'
    },
    ,
    ...featureKeys
    // ...auth,
    // ...user,
    // ...role,
    // ...auditLogs
  ]
};
