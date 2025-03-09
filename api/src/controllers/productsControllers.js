const { Product, Brand, Segment, Size, Image } = require("../db");
const {
  getImagesByProductIdController,
  deleteImageController,
} = require("./imagesControllers");

const postProductController = async (
  name,
  detail,
  price,
  brandId,
  segmentId,
  sizeId,
  article
) => {
  const [newProduct, created] = await Product.findOrCreate({
    where: { name },
    defaults: {
      detail,
      price,
      brandId,
      segmentId,
      sizeId,
      article,
    },
  });
  if (!created) return "El producto ya existe en la base de datos";
  return newProduct;
};

const postProductsController = async (data) => {
  const products = await Product.bulkCreate(data);
  return products;
};

const getProductsController = async (where, include, order) => {
  const allProducts = await Product.findAll({
    where,
    include,
    order,
    attributes: {
      exclude: ["brandId", "sizeId", "segmentId"],
    },
    include: [
      {
        model: Brand,
        attributes: ["id", "name"],
      },
      {
        model: Segment,
        attributes: ["id", "name"],
      },
      {
        model: Size,
        attributes: ["id", "name"],
      },
      {
        model: Image,
        attributes: ["id", "url", "filename"],
      },
    ],
  });
  if (!allProducts) return "No hay productos cargados en la base de datos";
  return allProducts;
};

const getProductByIdController = async (id) => {
  const product = await Product.findByPk(id, {
    attributes: {
      exclude: ["brandId", "sizeId", "segmentId"],
    },
    include: [
      {
        model: Brand,
        attributes: ["id", "name"],
      },
      {
        model: Segment,
        attributes: ["id", "name"],
      },
      {
        model: Size,
        attributes: ["id", "name"],
      },
      {
        model: Image,
        attributes: ["id", "url", "filename"],
      },
    ],
  });
  if (!product) return "No se encuentra el producto solicitado";
  return product;
};

const deleteProductController = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return "El producto no existe o ya fue eliminado";
  const images = await getImagesByProductIdController(id);
  if (!images || images.length === 0) {
    console.log("No hay imágenes asociadas a este producto.");
    return;
  }
  await Promise.all(
    images.map(async (image) => {
      await deleteImageController(image.id);
      console.log(`Imagen con ID ${image.id} eliminada`);
    })
  );
  console.log("Todas las imágenes fueron eliminadas.");

  const deletedProduct = await product.destroy();
  return deletedProduct;
};

const patchProductController = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product)
    return "No se puede modificar el producto porque no existe en la base de datos";
  const updatedProduct = await product.update(data);
  return updatedProduct;
};

module.exports = {
  postProductController,
  getProductsController,
  deleteProductController,
  patchProductController,
  getProductByIdController,
  postProductsController,
};
