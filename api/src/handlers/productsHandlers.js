const {
  postProductController,
  getProductsController,
  patchProductController,
  deleteProductController,
} = require("../controllers/productsControllers");

const postProductHandler = async (req, res) => {
  const { brand, name, type, volume, size, price, image } = req.body;
  try {
    if (![brand, name, type, volume, size, price, image].every(Boolean))
      throw new Error("Faltan datos");
    const newProduct = await postProductController(
      brand,
      name,
      type,
      volume,
      size,
      price,
      image
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductsHandler = async (req, res) => {
  try {
    const allProducts = await getProductsController();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { postProductHandler, getProductsHandler };
