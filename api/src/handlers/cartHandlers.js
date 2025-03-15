const { User, Product } = require("../db");

const getCartHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: [{ model: Product, through: { attributes: ["quantity"] } }],
    });
    res.json(user.Products);
  } catch (error) {
    next(error);
  }
};

const addToCartHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Producto no encontrado");
    await user.addProduct(product, { through: { quantity } });
    res.status(201).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    next(error);
  }
};

const removeFromCartHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Producto no encontrado");
    await user.removeProduct(product);
    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCartHandler, addToCartHandler, removeFromCartHandler };