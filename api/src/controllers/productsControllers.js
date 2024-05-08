const { Product, Client } = require("../db");

const postProductController = async (
  brand,
  name,
  type,
  volume,
  size,
  price,
  image
) => {
  const [newProduct, created] = await Product.findOrCreate({
    where: {
      brand,
      name,
      type,
      volume,
      size,
      price,
      image,
    },
  });
  if (!created) return "El producto ya existe en la base de datos";
  return newProduct;
};

const postProductsController = async (data) => {
  const products = await Product.bulkCreate(data);
  return products;
};

const getProductsController = async () => {
  const allProducts = await Product.findAll();
  if (!allProducts) return "No hay productos cargados en la base de datos";
  return allProducts;
};

const getProductByIdController = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return "No se encuentra el producto solicitado";
  return product;
};

const deleteProductController = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return "El producto no existe o ya fue eliminado";
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
