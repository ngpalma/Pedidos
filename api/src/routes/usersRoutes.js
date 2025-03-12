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
usersRoutes.get("/me", authToken, getUserByIdHandler);
usersRoutes.get("/email/:email", authToken, getUserByEmailHandler);
usersRoutes.get("/:id", authToken, getUserByIdHandler);
usersRoutes.patch("/:id", authToken, patchUserHandler);
usersRoutes.delete("/:id", authToken, authorizeAdmin, deleteUserController);

module.exports = usersRoutes;
