const express = require("express");
const router = express.Router();
const controller = require("../controller");
const validation = require("../validation");


router.post("/login", validation.login, controller.login);
router.post("/register", validation.register, controller.register);


module.exports = router
