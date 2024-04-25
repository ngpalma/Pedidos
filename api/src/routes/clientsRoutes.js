const { Router } = require("express");
const {
  postClientHandler,
  getClientsHandler,
  deleteClientHandler,
  patchClientHandler,
  getClientByIdHandler,
} = require("../handlers/clientsHandlers");

const clientsRoutes = Router();

clientsRoutes.get("/", getClientsHandler);
clientsRoutes.get("/:id", getClientByIdHandler);
clientsRoutes.post("/", postClientHandler);
clientsRoutes.patch("/:id", patchClientHandler);
clientsRoutes.delete("/:id", deleteClientHandler);

module.exports = clientsRoutes;
