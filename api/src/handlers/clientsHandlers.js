const {
  postClientController,
  getClientsController,
  patchClientController,
  deleteClientController,
  getClientByIdController,
} = require("../controllers/clientsControllers");

//cargar un cliente siempre que esten completos todos los datos
const postClientHandler = async (req, res) => {
  try {
    const { name, address, telephone, city } = req.body;
    if (![name, address, telephone, city].every(Boolean))
      throw new Error("Complete todos los datos");
    const newClient = await postClientController(
      name,
      address,
      telephone,
      city
    );
    res.status(200).json(newClient);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//obtener los clientes de la base de datos
const getClientsHandler = async (req, res) => {
  try {
    const allClients = await getClientsController();
    res.status(200).json(allClients);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//eliminar un registro cliente de la base de datos
const deleteClientHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await deleteClientController(id);
    res.status(200).json(deletedClient);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//actualizar los datos de un registro cliente
const patchClientHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const client = await patchClientController(id, data);
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//obtener un registro cliente por su id
const getClientByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await getClientByIdController(id);
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postClientHandler,
  getClientsHandler,
  deleteClientHandler,
  patchClientHandler,
  getClientByIdHandler,
};
