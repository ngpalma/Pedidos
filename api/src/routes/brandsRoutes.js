const { Router } = require("express");
const {
  postBrandsHandler,
  getBrandsHandler,
  deleteBrandsHandler,
  patchBrandsHandler,
  getBrandsByIdHandler,
} = require("../handlers/brandsHandlers");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");

const brandsRoutes = Router();

brandsRoutes.get("/", getBrandsHandler);
brandsRoutes.get("/:id", getBrandsByIdHandler);
brandsRoutes.post("/", authToken, authorizeAdmin, postBrandsHandler);
brandsRoutes.patch("/:id", authToken, authorizeAdmin, patchBrandsHandler);
brandsRoutes.delete("/:id", authToken, authorizeAdmin, deleteBrandsHandler);

module.exports = brandsRoutes;
