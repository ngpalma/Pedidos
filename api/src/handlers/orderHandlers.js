const { User, Product, Address } = require("../db");

const createOrderHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.body; // Dirección seleccionada por el cliente

    const user = await User.findByPk(userId, {
      include: [
        { model: Product, through: { attributes: ["quantity"] } },
        { model: Address },
      ],
    });
    const address = user.Addresses.find((a) => a.id === addressId);
    if (!address) throw new Error("Dirección no encontrada");

    const cartItems = user.Products;
    if (!cartItems.length) throw new Error("El carrito está vacío");

    // Generar mensaje para WhatsApp
    let message = `Nuevo pedido de ${user.firstName} ${user.lastName}\n`;
    message += `Teléfono: ${user.telephone}\n`;
    message += `Dirección: ${address.street} ${address.number}, ${address.city}, ${address.state}\n`;
    message += "Productos:\n";
    cartItems.forEach((item) => {
      message += `- ${item.name} (${item.cart.quantity} unidades) - $${item.price * item.cart.quantity}\n`;
    });

    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`; // Reemplaza con tu número
    await user.setProducts([]); // Limpia el carrito tras el pedido
    res.json({ message: "Pedido creado", whatsappUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrderHandler };