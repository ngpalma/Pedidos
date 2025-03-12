const { Router } = require("express");
const {
  postImageHandler,
  getImagesHandler,
  deleteImageHandler,
  patchImageHandler,
  getImageByIdHandler,
  getImagesByProductIdHandler,
} = require("../handlers/imagesHandlers");

const upload = require("../middlewares/multerConfig");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");

const imagesRoutes = Router();

imagesRoutes.get("/", getImagesHandler);
imagesRoutes.get("/:id", getImageByIdHandler);
imagesRoutes.get("/product/:productId", getImagesByProductIdHandler);
imagesRoutes.post("/", authToken, authorizeAdmin, upload.array("media", 5), postImageHandler);
imagesRoutes.patch("/:id", authToken, authorizeAdmin, patchImageHandler);
imagesRoutes.delete("/:id", authToken, authorizeAdmin, deleteImageHandler);

module.exports = imagesRoutes;
