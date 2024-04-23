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

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductController(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const patchProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!data) {
      // Si no se proporciona ningún dato en el cuerpo de la solicitud.
      return res.status(400).json({ error: 'Data not provided' });
    }
    const product = await patchProductController(id, data);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postProductHandler,
  getProductsHandler,
  deleteProductHandler,
  patchProductHandler,
};
