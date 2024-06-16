const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@helper/defineRoute');
const controller = require('../controller');
const role = require('../key');

TokenRoleRoute(router, auth, 'get', '/superAdminMail', controller.superAdminMail, role.get);

module.exports = router;
