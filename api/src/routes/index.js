const { Router } = require("express");
const clientsRoutes = require("./clientsRoutes");
const productsRoutes = require("./productsRoutes");

const router = Router();

router.use("/clients", clientsRoutes);
router.use("/products", /*productsRoutes*/ ()=>console.log("Holis"));

module.exports = router;
