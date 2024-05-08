const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  deleteProductHandler,
  patchProductHandler,
  getProductByIdHandler,
  postProductsHandler,
} = require("../handlers/productsHandlers");

const productsRoutes = Router();

productsRoutes.get("/", getProductsHandler);
productsRoutes.get("/:id", getProductByIdHandler);
productsRoutes.post("/", postProductHandler);
productsRoutes.post("/bulk", postProductsHandler);
productsRoutes.patch("/:id", patchProductHandler);
productsRoutes.delete("/:id", deleteProductHandler);

module.exports = productsRoutes;
