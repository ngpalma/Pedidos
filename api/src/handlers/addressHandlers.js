const {
  postAddressController,
  getAddressController,
  patchAddressController,
  deleteAddressController,
  getAddressByIdController,
} = require("../controllers/AddressControllers");

const postAddressHandler = async (req, res) => {
  try {
    const { brand, name, type, volume, size, price, image } = req.body;
    if (![brand, name, type, volume, size, price, image].every(Boolean))
      throw new Error("Faltan datos");
    const newAddress = await postAddressController(
      brand,
      name,
      type,
      volume,
      size,
      price,
      image
    );
    res.status(200).json(newAddress);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAddressHandler = async (req, res) => {
  try {
    const allAddresss = await getAddressController();
    res.status(200).json(allAddresss);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAddressByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const Address = await getAddressByIdController(id);
    res.status(200).json(Address);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteAddressHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await deleteAddressController(id);
    res.status(200).json(deletedAddress);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const patchAddressHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const Address = await patchAddressController(id, data);
    res.status(200).json(Address);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postAddressHandler,
  getAddressHandler,
  deleteAddressHandler,
  patchAddressHandler,
  getAddressByIdHandler,
};
