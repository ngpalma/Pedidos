const { Router } = require("express");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");
const { deleteUserController } = require("../controllers/usersControllers");

const adminRoutes = Router();

adminRoutes.delete("/users/delete/:id", authToken, authorizeAdmin, deleteUserController);

module.exports = adminRoutes;
