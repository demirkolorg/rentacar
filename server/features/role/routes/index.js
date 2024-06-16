const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@helper/defineRoute');
const controller = require('../controller');
const role = require('../key');

TokenRoleRoute(router, auth, 'post', '/add', controller.add, role.add);

module.exports = router;
