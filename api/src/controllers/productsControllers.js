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

  return newProduct;
};

const getProductsController = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

const deleteProductController = async (id) => {
  const product = await Product.findByPk(id);
  const deletedProduct = await product.destroy();
  return deletedProduct;
};

const patchProductController = async (id, data) => {
  const product = await Product.findByPk(id);
  console.log(product);
  if (!product) {
    // Si no se encuentra el producto con el ID proporcionado.
    return res.status(404).json({ error: 'Product not found' });
  }
  await product.update(data);
  return product;
};

module.exports = {
  postProductController,
  getProductsController,
  deleteProductController,
  patchProductController,
};
