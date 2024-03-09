//dış
const pasport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

//iç
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
        let user = await Users.findOne({ _id: payload.id });
        if (!user) {
          done(new Error(message.usernotfound));
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
          exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME,
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
        const hasRequiredRole = expectedRoles.some((role) =>
          req.user.permissions.includes(role)
        );

        if (!hasRequiredRole) {
          return response.error(res, message.UNAUTHORIZED_ACCESS_DESC,message.UNAUTHORIZED_ACCESS_TITLE);
        }

        return next(); // Auth success
      };
    },
  };
};
