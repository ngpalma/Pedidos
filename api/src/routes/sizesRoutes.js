const { Router } = require("express");
const {
  getSizesHandler,
  getSizeByIdHandler,
  postSizeHandler,
  patchSizeHandler,
  deleteSizeHandler,
} = require("../handlers/sizesHandlers");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");

const sizesRoutes = Router();

sizesRoutes.get("/", getSizesHandler);
sizesRoutes.get("/:id", getSizeByIdHandler);
sizesRoutes.post("/", authToken, authorizeAdmin, postSizeHandler);
sizesRoutes.patch("/:id", authToken, authorizeAdmin, patchSizeHandler);
sizesRoutes.delete("/:id", authToken, authorizeAdmin, deleteSizeHandler);

module.exports = sizesRoutes;
