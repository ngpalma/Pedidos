const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  deleteProductHandler,
  patchProductHandler,
  getProductByIdHandler,
  postProductsHandler,
} = require("../handlers/productsHandlers");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");

const productsRoutes = Router();

productsRoutes.get("/", getProductsHandler);
productsRoutes.get("/:id", getProductByIdHandler);
productsRoutes.post("/", authToken, authorizeAdmin, postProductHandler);
productsRoutes.post("/bulk", authToken, authorizeAdmin, postProductsHandler);
productsRoutes.patch("/:id", authToken, authorizeAdmin, patchProductHandler);
productsRoutes.delete("/:id", authToken, authorizeAdmin, deleteProductHandler);

module.exports = productsRoutes;
