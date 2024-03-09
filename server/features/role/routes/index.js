const express = require("express");
const router = express.Router();
const controller = require("../controller");
const validation = require("../validation");

// const authMiddleware = require("../middlewares/auth");

router.post("/add", validation.add, controller.add);

module.exports = router;
