const jwt = require('jsonwebtoken');
const ENUM = require('../config').ENUM;
const ENV = require('../config').env;

const Users = require('@features/user/model');
const Roles = require('@features/role/model');
const response = require('@helper/response');
const message = require('@lib/message');

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Erişim reddedildi' });
    }
    if (token.split('!a+s%y&a?')[1] === ENUM.SYSTEM_REQUEST_TOKEN) {
      return next();
    }
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), ENV.JWT.SECRET);
      req.user = decoded;

      next();
    } catch (error) {
      res.status(400).json({ message: 'Geçersiz token' });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const user = await Users.findById(req.user.id);
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Yetkisiz erişim' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Yetkilendirme hatası' });
    }
  },

  hasRole: (...expectedRoles) => {
    return async (req, res, next) => {
      try {
        const token = req.header('Authorization');

        //istek sistem tarafından atıldı
        if (token.split('!a+s%y&a?')[1] === ENUM.SYSTEM_REQUEST_TOKEN) {
          return next();
        }
        const user = await Users.findById(req.user.id);
        const userRoles = await Roles.find({ _id: user.roller });
        const rolsSet = new Set();
        const permissionsSet = new Set();

        userRoles.forEach(role => {
          rolsSet.add(role.name);
          role.permissions.forEach(permission => {
            permissionsSet.add(permission);
          });
        });
        const UserRoles = [...rolsSet];
        const UserPermissions = [...permissionsSet];

        //isteği atan süperadmin
        if (UserPermissions.includes(ENUM.ROLE_SUPER_ADMIN_PERMISSION)) {
          return next();
        }

        // genel kullanıcı rol kontrolü
        const hasRequiredRole = expectedRoles.some(roleObj => {
          const roleKey = roleObj.key;
          return UserPermissions.includes(roleKey) || UserPermissions.includes(roleKey.split('_')[0] + '_full');
        });

        if (!hasRequiredRole) {
          return response.error(res, message.UNAUTHORIZED_ACCESS_DESC, message.UNAUTHORIZED_ACCESS_TITLE);
        }

        return next();
      } catch (error) {
        res.status(500).json({ message: 'Rol Yetkilendirme hatası' });
      }
    };
  }
};
