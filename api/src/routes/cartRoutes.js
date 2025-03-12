const { Router } = require("express");
const { authToken } = require("../middlewares/authMiddleware");
const { addToCartHandler, getCartHandler, removeFromCartHandler } = require("../handlers/cartHandlers");

const cartRoutes = Router();

cartRoutes.get("/", authToken, getCartHandler);
cartRoutes.post("/", authToken, addToCartHandler);
cartRoutes.delete("/:productId", authToken, removeFromCartHandler);

module.exports = cartRoutes;