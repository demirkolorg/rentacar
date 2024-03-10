const express = require("express");
const router = express.Router();
const controller = require("../controller");
const validation = require("../validation");
const auth = require("../../../middlewares/auth")();
auth.a;

router.all("*", auth.auth(), (req, res, next) => {
  next();
});

router.post(
  "/add",
  auth.cr("user_full", "user_full_add", "user_add"),
  validation.add,
  controller.add
);
router.post(
  "/update",
  auth.cr("user_full", "user_full_update", "user_update"),
  validation.update,
  controller.update
);
router.post(
  "/delete",
  auth.cr("user_full", "user_full_delete", "user_delete"),
  validation.delete,
  controller.delete
);



router.post(
  "/getUserRoles",
  auth.cr("user_full", "user_full_list", "user_getUserRoles"),
  controller.getUserRoles
);
router.post(
  "/getUserPermissions",
  auth.cr("user_full", "user_full_list", "user_getUserPermissions"),
  controller.getUserPermissions
);
router.post(
  "/getUserRolesAndPermissions",
  auth.cr("user_full", "user_full_list", "user_getUserRolesAndPermissions"),
  controller.getUserRolesAndPermissions
);

module.exports = router;
