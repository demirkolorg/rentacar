//dış
const pasport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

//iç
const Enum = require("../config/enum.config");
const config = require("../config/env.config");
const Users = require("../features/user/model");
const Roles = require("../features/role/model");
const response = require("../lib/response");
const message = require("../lib/message");

module.exports = function () {
  let strategy = new Strategy(
    {
      secretOrKey: config.JWT.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        if (Date.now() / 1000 >= payload.exp) {
          return done(new Error("Token expired"), null);
        }

        let user = await Users.findOne({ _id: payload.id });
        if (!user) {
          done(new Error(message.usernotfound), null);
        }

        let userRoles = await Roles.find({ _id: user.roller });
        let rolsSet = new Set();
        let permissionsSet = new Set();

        userRoles.forEach((role) => {
          rolsSet.add(role.name);
          role.permissions.forEach((permission) => {
            permissionsSet.add(permission);
          });
        });
        let UserRoles = [...rolsSet];
        let UserPermissions = [...permissionsSet];

        done(null, {
          id: user._id,
          roles: UserRoles,
          permissions: UserPermissions,
          email: user.email,
          ad: user.ad,
          soyad: user.soyad,
          exp: Math.floor(Date.now() / 1000) + 86400, // Set token to expire in 1 day
        });
      } catch (error) {
        done(error, null);
      }
    }
  );

  pasport.use(strategy);

  return {
    initialize() {
      return pasport.initialize();
    },
    auth() {
      return pasport.authenticate("jwt", { session: false });
    },
    cr: (...expectedRoles) => {
      return (req, res, next) => {
        if (req.user.permissions.includes(Enum.ROLE_SUPER_ADMIN_PERMISSION)) {
          return next();
        }

        const hasRequiredRole = expectedRoles.some((role) =>
          req.user.permissions.includes(role)
        );

        if (!hasRequiredRole) {
          return response.error(
            res,
            message.UNAUTHORIZED_ACCESS_DESC,
            message.UNAUTHORIZED_ACCESS_TITLE
          );
        }

        return next(); // Auth success
      };
    },
  };
};
