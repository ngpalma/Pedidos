const { Router } = require("express");
const {
  getSizesHandler,
  getSizeByIdHandler,
  postSizeHandler,
  patchSizeHandler,
  deleteSizeHandler,
} = require("../handlers/sizesHandlers");

const sizesRoutes = Router();

sizesRoutes.get("/", getSizesHandler);
sizesRoutes.get("/:id", getSizeByIdHandler);
sizesRoutes.post("/", postSizeHandler);
sizesRoutes.patch("/:id", patchSizeHandler);
sizesRoutes.delete("/:id", deleteSizeHandler);

module.exports = sizesRoutes;
