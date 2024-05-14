const express = require('express');
const router = express.Router();

const userRoutes = require("../features/user/routes");
const roleRoutes = require("../features/role/routes");
const authRoutes = require("../features/auth/routes");
const uploadRoutes = require("../features/upload/routes");
const firmaRoutes = require("../features/firma/routes");
const subeRoutes = require("../features/sube/routes");
const pozisyonRoutes = require("../features/pozisyon/routes");

//genel
router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/role', roleRoutes);

//kartlar
router.use('/firma', firmaRoutes);
router.use('/sube', subeRoutes);
router.use('/pozisyon', pozisyonRoutes);

module.exports = router;
