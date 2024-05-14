const express = require("express");
const router = express.Router();

const controller = require("../controller");
const auth = require("../../../middlewares/auth")();


router.use(auth.initialize());
router.use(auth.auth()); 


router.post(
  "/get",
  auth.cr("pozisyon_full", "pozisyon_full_list", "pozisyon_get"),
  controller.get
);
router.post(
  "/getAll",
  auth.cr("pozisyon_full", "pozisyon_full_list", "pozisyon_getall"),
  controller.getAll
);

router.post(
  "/add",
  auth.cr("pozisyon_full", "pozisyon_full_add", "pozisyon_add"),
  controller.add
);
router.post(
  "/update",
  auth.cr("pozisyon_full", "pozisyon_full_update", "pozisyon_update"),
  controller.update
);
router.post(
  "/delete",
  auth.cr("pozisyon_full", "pozisyon_full_delete", "pozisyon_delete"),
  controller.delete
);


router.post(
  "/durumDegistir",
  auth.cr("pozisyon_full", "pozisyon_full_update", "pozisyon_durumDegistir"),
  controller.durumDegistir
);

module.exports = router;
