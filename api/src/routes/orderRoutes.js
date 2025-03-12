const { Router } = require("express");
const { authToken } = require("../middlewares/authMiddleware");
const { createOrderHandler } = require("../handlers/orderHandlers");

const orderRoutes = Router();

orderRoutes.post("/", authToken, createOrderHandler);

module.exports = orderRoutes;