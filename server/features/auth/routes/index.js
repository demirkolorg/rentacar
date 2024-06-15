const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@lib/defineRoute');
const controller = require('../controller');

PublicRoute(router, 'post', '/login', controller.login);
PublicRoute(router, 'post', '/register', controller.register);

module.exports = router;
