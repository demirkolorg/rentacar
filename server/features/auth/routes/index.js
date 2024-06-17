const express = require('express');
const router = express.Router();
const auth = require('@middlewares/auth');
const { TokenRoleRoute, TokenRoute, PublicRoute } = require('@helper/defineRoute');
const controller = require('../controller');

PublicRoute(router, 'post', '/login', controller.login);
PublicRoute(router, 'get', '/logout', controller.logout);
PublicRoute(router, 'post', '/register', controller.register);

module.exports = router;
