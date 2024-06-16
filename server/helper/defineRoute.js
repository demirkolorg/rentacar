const TokenRoleRoute = (router, auth, method, path, action, role) => {
  router[method](path, auth.verifyToken, auth.hasRole(role), action);
};

const TokenRoute = (router, auth, method, path, action) => {
  router[method](path, auth.verifyToken, action);
};

const PublicRoute = (router, method, path, action) => {
  router[method](path, action);
};

const UploadRoute = (router, auth, method, path, action, middleware) => {
  router[method](path, auth.verifyToken, middleware, action);
};

module.exports = { TokenRoleRoute, TokenRoute, PublicRoute, UploadRoute };
