const { Product, Image } = require("../db");

const {
  postImageController,
  getImagesController,
  patchImageController,
  deleteImageController,
  getImageByIdController,
  getImagesByProductIdController,
} = require("../controllers/imagesControllers");

const postImageHandler = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("No se encontro el producto");
    if (!req.file) throw new Error("No se cargó ninguna imagen");

    const imageUrl = req.file.path; // Ruta del archivo

    const filename = req.file.filename; // Nombre del archivo

    const newImage = await postImageController(filename, imageUrl, productId);
    res.status(200).json(newImage);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getImagesHandler = async (req, res) => {
  try {
    const allImages = await getImagesController();
    res.status(200).json(allImages);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getImageByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageByIdController(id);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getImagesByProductIdHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const images = await getImagesByProductIdController(productId);
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteImageHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await deleteImageController(id);
    res.status(200).json(deletedImage);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const patchImageHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const image = await patchImageController(id, data);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postImageHandler,
  getImagesHandler,
  deleteImageHandler,
  patchImageHandler,
  getImageByIdHandler,
  getImagesByProductIdHandler,
};
