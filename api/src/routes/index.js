const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const usersRoutes = require("./usersRoutes");
const authRoutes = require("./authRoutes");
const addressRoutes = require("./addressRoutes");
const brandsRoutes = require("./brandsRoutes");
const sizesRoutes = require("./sizesRoutes");
const segmentsRoutes = require("./segmentsRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/address", addressRoutes);
router.use("/brands", brandsRoutes);
router.use("/sizes", sizesRoutes);
router.use("/segments", segmentsRoutes);
router.use("/images", imagesRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
