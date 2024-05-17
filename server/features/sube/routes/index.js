const express = require("express");
const router = express.Router();

const controller = require("../controller");
const auth = require("../../../middlewares/auth")();


router.use(auth.initialize());
router.use(auth.auth()); 


router.post(
  "/get",
  auth.cr("sube_full", "sube_full_list", "sube_get"),
  controller.get
);
router.post(
  "/getIds",
  auth.cr("sube_full", "sube_full_list", "sube_getIds"),
  controller.getIds
);
router.post(
  "/getAll",
  auth.cr("sube_full", "sube_full_list", "sube_getall"),
  controller.getAll
);

router.post(
  "/add",
  auth.cr("sube_full", "sube_full_add", "sube_add"),
  controller.add
);
router.post(
  "/update",
  auth.cr("sube_full", "sube_full_update", "sube_update"),
  controller.update
);
router.post(
  "/delete",
  auth.cr("sube_full", "sube_full_delete", "sube_delete"),
  controller.delete
);


router.post(
  "/durumDegistir",
  auth.cr("sube_full", "sube_full_update", "sube_durumDegistir"),
  controller.durumDegistir
);

module.exports = router;
