const { Router } = require("express");
const {
  postClientHandler,
  getClientsHandler,
  deleteClientHandler,
  patchClientHandler,
} = require("../handlers/clientsHandlers");

const clientsRoutes = Router();

clientsRoutes.get("/", getClientsHandler);
clientsRoutes.post("/", postClientHandler);
clientsRoutes.patch("/:id", patchClientHandler);
clientsRoutes.delete("/:id", deleteClientHandler);

module.exports = clientsRoutes;
