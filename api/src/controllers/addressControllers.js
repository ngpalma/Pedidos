const { Address, Client } = require("../db");

const postAddressController = async (
  brand,
  name,
  type,
  volume,
  size,
  price,
  image
) => {
  const [newAddress, created] = await Address.findOrCreate({
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
  if (!created) return "El Addresso ya existe en la base de datos";
  return newAddress;
};

const postAddresssController = async (data) => {
  const Addresss = await Address.bulkCreate(data);
  return Addresss;
};

const getAddresssController = async () => {
  const allAddresss = await Address.findAll();
  if (!allAddresss) return "No hay Addressos cargados en la base de datos";
  return allAddresss;
};

const getAddressByIdController = async (id) => {
  const Address = await Address.findByPk(id);
  if (!Address) return "No se encuentra el Addresso solicitado";
  return Address;
};

const deleteAddressController = async (id) => {
  const Address = await Address.findByPk(id);
  if (!Address) return "El Addresso no existe o ya fue eliminado";
  const deletedAddress = await Address.destroy();
  return deletedAddress;
};

const patchAddressController = async (id, data) => {
  const Address = await Address.findByPk(id);
  if (!Address)
    return "No se puede modificar el Addresso porque no existe en la base de datos";
  const updatedAddress = await Address.update(data);
  return updatedAddress;
};

module.exports = {
  postAddressController,
  getAddresssController,
  deleteAddressController,
  patchAddressController,
  getAddressByIdController,
  postAddresssController,
};
