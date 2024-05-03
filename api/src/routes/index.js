const { Router } = require("express");
const clientsRoutes = require("./clientsRoutes");
const productsRoutes = require("./productsRoutes");
const usersRoutes = require("./usersRoutes");
const authRoutes = require("./authRoutes")

const router = Router();

router.use("/clients", clientsRoutes);
router.use("/products", productsRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes)

module.exports = router;
