const fs = require("fs");
const path = require("path");
const { Image, Product } = require("../db");

const postImageController = async (filename, url, productId) => {
  const [newImage, created] = await Image.findOrCreate({
    where: {
      url,
    },
    defaults: {
      productId,
      filename,
    },
  });
  if (!created) return "La imagen ya existe en la base de datos";
  return newImage;
};

const getImagesController = async () => {
  const allImages = await Image.findAll();
  if (!allImages) return "No hay imagenes cargados en la base de datos";
  return allImages;
};

const getImageByIdController = async (id) => {
  const image = await Image.findByPk(id);
  if (!image) return "No se encuentra la imagen solicitada";
  return image;
};

const getImagesByProductIdController = async (productId) => {
  const product = await Product.findByPk(productId, {
    include: {
      model: Image,
      attributes: ["id", "url"],
    },
  });

  if (!product) return "Producto no encontrado";

  return product.images;
};

const deleteImageController = async (id) => {
  const image = await Image.findByPk(id);
  if (!image) return "La imagen no existe o ya fue eliminada";

  // Construye la ruta completa del archivo a eliminar
  const imagePath = path.join(__dirname, "..", "..", "uploads", image.filename);
  console.log(imagePath);

  // Verifica si la ruta existe antes de intentar eliminar
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath); // Elimina el archivo del sistema de archivos
  }

  await image.destroy();
  return "Imagen eliminada con éxito";
};

const patchImageController = async (id, data) => {
  const image = await Image.findByPk(id);
  if (!image)
    return "No se puede modificar la imagen porque no existe en la base de datos";
  const updatedImage = await Image.update(data);
  console.log(data)
  return updatedImage;
};

module.exports = {
  postImageController,
  getImagesController,
  deleteImageController,
  patchImageController,
  getImageByIdController,
  getImagesByProductIdController,
};
