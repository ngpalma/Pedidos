const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  deleteProductHandler,
  patchProductHandler,
} = require("../handlers/productsHandlers");

const productsRoutes = Router();

productsRoutes.get("/", getProductsHandler);
productsRoutes.post("/", postProductHandler);
productsRoutes.patch("/:id", patchProductHandler);
productsRoutes.delete("/:id", deleteProductHandler);

module.exports = productsRoutes;
