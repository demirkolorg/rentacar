const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@helper/defineRoute');
const controller = require('../controller');
const role = require('../key');

TokenRoleRoute(router, auth, 'post', '/get', controller.get, role.get);
TokenRoleRoute(router, auth, 'post', '/getIds', controller.getIds, role.list);
TokenRoleRoute(router, auth, 'post', '/list', controller.list, role.list);
TokenRoleRoute(router, auth, 'post', '/add', controller.add, role.add);
TokenRoleRoute(router, auth, 'post', '/update', controller.update, role.update);
TokenRoleRoute(router, auth, 'post', '/active', controller.active, role.active);
TokenRoleRoute(router, auth, 'post', '/passive', controller.passive, role.passive);
TokenRoleRoute(router, auth, 'post', '/archive', controller.archive, role.archive);
TokenRoleRoute(router, auth, 'post', '/unarchive', controller.unarchive, role.unarchive);
TokenRoleRoute(router, auth, 'post', '/softDelete', controller.softDelete, role.softDelete);
TokenRoleRoute(router, auth, 'post', '/restore', controller.restore, role.restore);
TokenRoleRoute(router, auth, 'post', '/hardDelete', controller.hardDelete, role.hardDelete);

module.exports = router;
