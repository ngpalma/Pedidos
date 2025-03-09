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

const imagesRoutes = Router();

imagesRoutes.get("/", getImagesHandler);
imagesRoutes.get("/:id", getImageByIdHandler);
imagesRoutes.get("/product/:productId", getImagesByProductIdHandler);
imagesRoutes.post("/", upload.single("image"), postImageHandler);
imagesRoutes.patch("/:id", patchImageHandler);
imagesRoutes.delete("/:id", deleteImageHandler);

module.exports = imagesRoutes;
