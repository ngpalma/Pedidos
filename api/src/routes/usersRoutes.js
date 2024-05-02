const { Router } = require("express");
const {
  getUsersHandler,
  deleteUserHandler,
  patchUserHandler,
  getUserByIdHandler,
} = require("../handlers/usersHandlers");

const usersRoutes = Router();

usersRoutes.get("/", getUsersHandler);
usersRoutes.get("/:id", getUserByIdHandler);
usersRoutes.patch("/:id", patchUserHandler);
usersRoutes.delete("/:id", deleteUserHandler);

module.exports = usersRoutes;
