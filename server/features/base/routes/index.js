const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@helper/defineRoute');
const controller = require('../controller');
const role = require('../key');

// TokenRoleRoute(router, auth, 'post', '/get', controller.get, role.get);
// TokenRoute(router, auth, 'post', '/getAll', controller.getAll);
// PublicRoute(router, 'post', '/getAll', controller.getAll);

module.exports = router;
