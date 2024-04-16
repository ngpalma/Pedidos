const { Router } = require("express");
const {
  postClientHandler,
  getClientsHandler,
  deleteClientHandler,
  patchClientHandler,
} = require("../handlers/clientsHandlers");

const clientsRoutes = Router();

clientsRoutes.get("/", /*getClientsHandler*/ ()=>console.log("GET de clientes"));
clientsRoutes.post("/", /*postClientHandler*/ ()=>console.log("POST de clientes"));
clientsRoutes.patch("/:id", /*patchClientHandler*/ ()=>console.log("PATCH de clientes"));
clientsRoutes.delete("/:id", /*deleteClientHandler*/ ()=>console.log("DELETE de clientes"));

module.exports = clientsRoutes;
