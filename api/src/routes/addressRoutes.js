const { Router } = require("express");
const {
  postAddressHandler,
  getAddressHandler,
  deleteAddressHandler,
  patchAddressHandler,
  getAddressByIdHandler,
} = require("../handlers/addressHandlers");
const { authToken } = require("../middlewares/authMiddleware");
const addressRoutes = Router();

addressRoutes.get("/", authToken, getAddressHandler);
addressRoutes.get("/:id", authToken, getAddressByIdHandler);
addressRoutes.post("/", authToken, postAddressHandler);
addressRoutes.patch("/:id", authToken, patchAddressHandler);
addressRoutes.delete("/:id", authToken, deleteAddressHandler);

module.exports = addressRoutes;
