const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@lib/defineRoute');
const controller = require('../controller');
const role = require('../key');

TokenRoleRoute(router, auth, 'post', '/get', controller.get, role.get);
TokenRoleRoute(router, auth, 'post', '/getIds', controller.getIds, role.list);
TokenRoleRoute(router, auth, 'post', '/getAll', controller.getAll, role.list);
TokenRoleRoute(router, auth, 'post', '/add', controller.add, role.add);
TokenRoleRoute(router, auth, 'post', '/update', controller.update, role.update);
TokenRoleRoute(router, auth, 'post', '/delete', controller.delete, role.hardDelete);
TokenRoleRoute(router, auth, 'post', '/durumDegistir', controller.durumDegistir, role.update);

module.exports = router;
