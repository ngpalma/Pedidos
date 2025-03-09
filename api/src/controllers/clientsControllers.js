const { Client } = require("../db");

//cargar un cliente en la base de datos si es que no existe
const postClientController = async (fullName, phone, addressId) => {
  const [newClient, created] = await Client.findOrCreate({
    where: {
      fullName,
    },
    defaults: { phone, addressId },
  });
  if (!created) return "El cliente ya se encuentra en la base de datos";
  return newClient;
};

//obtener todos los clientes de la base de datos
const getClientsController = async () => {
  const allClients = Client.findAll();
  if (!allClients) return "No hay clientes cargados en la base de datos";
  return allClients;
};

//actualizar todos o algunos datos de un cliente si es que existe
const patchClientController = async (id, data) => {
  const client = await Client.findByPk(id);
  if (!client) return "No se encontro al cliente que quiere actualizar";
  const updatedClient = await client.update(data);
  return updatedClient;
};

//eliminar un cliente existente de la base de datos
const deleteClientController = async (id) => {
  const client = await Client.findByPk(id);
  if (!client) return "No se encontro al cliente o ya fue eliminado";
  const deletedClient = await client.destroy();
  return deletedClient;
};

//encontrar un cliente en la base de datos por su id
const getClientByIdController = async (id) => {
  const client = await Client.findByPk(id);
  return client;
};

module.exports = {
  postClientController,
  getClientsController,
  patchClientController,
  deleteClientController,
  getClientByIdController,
};
