const AuditLogs = require('../features/AuditLogs/model');
const auth = require('../features/auth/model');
const firma = require('../features/firma/model');
const firmaPersonel = require('../features/firmaPersonel/model');
const pozisyon = require('../features/pozisyon/model');
const projeAyar = require('../features/projeAyar/model');
const role = require('../features/role/model');
const sube = require('../features/sube/model');
const upload = require('../features/upload/model');
const user = require('../features/user/model');

module.exports = {
  AuditLogs: AuditLogs.pointname,
  auth: auth.pointname,
  firma: firma.pointname,
  firmaPersonel: firmaPersonel.pointname,
  pozisyon: pozisyon.pointname,
  projeAyar: projeAyar.pointname,
  role: role.pointname,
  sube: sube.pointname,
  upload: upload.pointname,
  user: user.pointname
};
