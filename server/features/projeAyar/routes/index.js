const express = require("express");
const router = express.Router();

const controller = require("../controller");
const auth = require("../../../middlewares/auth")();


router.use(auth.initialize());
router.use(auth.auth()); 


router.get(
  "/superAdminMail",
  auth.cr("projeAyar_full", "projeAyar_full_list", "projeAyar_get"),
  controller.superAdminMail
);

module.exports = router;
