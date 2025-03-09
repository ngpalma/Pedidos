const { Router } = require("express");
const {
  getUsersHandler,
  patchUserHandler,
  getUserByIdHandler,
  getUserByEmailHandler,
} = require("../handlers/usersHandlers");
const { deleteUserController } = require("../controllers/usersControllers");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");

const usersRoutes = Router();

usersRoutes.get("/", authToken, authorizeAdmin, getUsersHandler);
usersRoutes.get("/:email", authToken, getUserByEmailHandler);
usersRoutes.get("/:id", authToken, getUserByIdHandler);
usersRoutes.patch("/update/:id", authToken, patchUserHandler);
usersRoutes.delete("/delete/:id", authToken, deleteUserController);

module.exports = usersRoutes;
