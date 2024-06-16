const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@helper/defineRoute');
const controller = require('../controller');
const role = require('../key');

TokenRoleRoute(router, auth, 'post', '/getUser', controller.getUser, role.get);
TokenRoleRoute(router, auth, 'post', '/getUserRoles', controller.getUserRoles, role.get);
TokenRoleRoute(router, auth, 'post', '/getUserPermissions', controller.getUserPermissions, role.get);
TokenRoleRoute(router, auth, 'post', '/getUserRolesAndPermissions', controller.getUserRolesAndPermissions, role.get);
TokenRoleRoute(router, auth, 'post', '/getAll', controller.getAll, role.list);
TokenRoleRoute(router, auth, 'post', '/add', controller.add, role.add);
TokenRoleRoute(router, auth, 'post', '/update', controller.update, role.update);
TokenRoleRoute(router, auth, 'post', '/delete', controller.delete, role.hardDelete);
TokenRoleRoute(router, auth, 'post', '/durumDegistir', controller.durumDegistir, role.update);

module.exports = router;
