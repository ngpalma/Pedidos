const { Router } = require("express");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");
const { deleteUserController } = require("../controllers/usersControllers");
const { getStatsHandler } = require("../handlers/adminHandlers");

const adminRoutes = Router();

adminRoutes.delete("/users/:id", authToken, authorizeAdmin, deleteUserController);
adminRoutes.get("/stats", authToken, authorizeAdmin, getStatsHandler);

module.exports = adminRoutes;
