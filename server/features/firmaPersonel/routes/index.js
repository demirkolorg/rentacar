const express = require("express");
const router = express.Router();

const controller = require("../controller");
const auth = require("@middlewares/auth")();

router.use(auth.initialize());
router.use(auth.auth());

router.post(
  "/get",
  auth.cr("firmaPersonel_full", "firmaPersonel_full_list", "firmaPersonel_get"),
  controller.get
);
router.post(
  "/getAll",
  auth.cr(
    "firmaPersonel_full",
    "firmaPersonel_full_list",
    "firmaPersonel_getall"
  ),
  controller.getAll
);

router.post(
  "/add",
  auth.cr("firmaPersonel_full", "firmaPersonel_full_add", "firmaPersonel_add"),
  controller.add
);
router.post(
  "/update",
  auth.cr(
    "firmaPersonel_full",
    "firmaPersonel_full_update",
    "firmaPersonel_update"
  ),
  controller.update
);
router.post(
  "/delete",
  auth.cr(
    "firmaPersonel_full",
    "firmaPersonel_full_delete",
    "firmaPersonel_delete"
  ),
  controller.delete
);

router.post(
  "/durumDegistir",
  auth.cr(
    "firmaPersonel_full",
    "firmaPersonel_full_update",
    "firmaPersonel_durumDegistir"
  ),
  controller.durumDegistir
);

module.exports = router;
