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
productsRoutes.patch(
  "/:id",
  /*patchProductHandler*/ () => console.log("PATCH de productos")
);
productsRoutes.delete(
  "/:id",
  /*deleteProductHandler*/ () => console.log("DELETE de productos")
);

module.exports = productsRoutes;
