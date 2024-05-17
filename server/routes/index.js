const express = require("express");
const router = express.Router();

const projeAyar = require("../features/projeAyar/routes");
const userRoutes = require("../features/user/routes");
const roleRoutes = require("../features/role/routes");
const authRoutes = require("../features/auth/routes");
const uploadRoutes = require("../features/upload/routes");
const firmaRoutes = require("../features/firma/routes");
const firmaPersonelRoutes = require("../features/firmaPersonel/routes");
const subeRoutes = require("../features/sube/routes");
const pozisyonRoutes = require("../features/pozisyon/routes");

//genel
router.use("/projeAyar", projeAyar);
router.use("/upload", uploadRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/role", roleRoutes);

//kartlar
router.use("/firma", firmaRoutes);
router.use("/firmaPersonel", firmaPersonelRoutes);
router.use("/sube", subeRoutes);
router.use("/pozisyon", pozisyonRoutes);

module.exports = router;
