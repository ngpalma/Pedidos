const { Router } = require("express");
const {
  postBrandsHandler,
  getBrandsHandler,
  deleteBrandsHandler,
  patchBrandsHandler,
  getBrandsByIdHandler,
} = require("../handlers/brandsHandlers");

const brandsRoutes = Router();

brandsRoutes.get("/", getBrandsHandler);
brandsRoutes.get("/:id", getBrandsByIdHandler);
brandsRoutes.post("/", postBrandsHandler);
brandsRoutes.patch("/:id", patchBrandsHandler);
brandsRoutes.delete("/:id", deleteBrandsHandler);

module.exports = brandsRoutes;
