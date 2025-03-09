const { Router } = require("express");
const {
  postAddressHandler,
  getAddressHandler,
  deleteAddressHandler,
  patchAddressHandler,
  getAddressByIdHandler,
} = require("../handlers/addressHandlers");

const addressRoutes = Router();

addressRoutes.get("/", getAddressHandler);
addressRoutes.get("/:id", getAddressByIdHandler);
addressRoutes.post("/", postAddressHandler);
addressRoutes.patch("/:id", patchAddressHandler);
addressRoutes.delete("/:id", deleteAddressHandler);

module.exports = addressRoutes;
