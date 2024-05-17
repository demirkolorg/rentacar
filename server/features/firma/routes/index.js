const express = require("express");
const router = express.Router();

const controller = require("../controller");
const auth = require("../../../middlewares/auth")();


router.use(auth.initialize());
router.use(auth.auth()); 


router.post(
  "/get",
  auth.cr("firma_full", "firma_full_list", "firma_get"),
  controller.get
);
router.post(
  "/getIds",
  auth.cr("firma_full", "firma_full_list", "firma_getIds"),
  controller.getIds
);
router.post(
  "/getAll",
  auth.cr("firma_full", "firma_full_list", "firma_getall"),
  controller.getAll
);

router.post(
  "/add",
  auth.cr("firma_full", "firma_full_add", "firma_add"),
  controller.add
);
router.post(
  "/update",
  auth.cr("firma_full", "firma_full_update", "firma_update"),
  controller.update
);
router.post(
  "/delete",
  auth.cr("firma_full", "firma_full_delete", "firma_delete"),
  controller.delete
);


router.post(
  "/durumDegistir",
  auth.cr("firma_full", "firma_full_update", "firma_durumDegistir"),
  controller.durumDegistir
);

module.exports = router;
