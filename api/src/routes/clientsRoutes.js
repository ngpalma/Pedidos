const { Router } = require("express");
const {
  postClientHandler,
  getClientsHandler,
  deleteClientHandler,
  patchClientHandler,
} = require("../handlers/clientsHandlers");

const clientsRoutes = Router();

clientsRoutes.get("/", /*getClientsHandler*/ ()=>console.log("Holis"));
clientsRoutes.post("/", /*postClientHandler*/ ()=>console.log("Holis"));
clientsRoutes.patch("/:id", /*patchClientHandler*/ ()=>console.log("Holis"));
clientsRoutes.delete("/:id", /*deleteClientHandler*/ ()=>console.log("Holis"));

module.exports = clientsRoutes;
