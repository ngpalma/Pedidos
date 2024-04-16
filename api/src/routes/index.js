const { Router } = require("express");
const clientsRoutes = require("./clientsRoutes");
const productsRoutes = require("./productsRoutes");

const router = Router();

router.use("/clients", clientsRoutes);
router.use("/products", productsRoutes);
router.use("/users", () => console.log("Ruta de usuarios"));

module.exports = router;
