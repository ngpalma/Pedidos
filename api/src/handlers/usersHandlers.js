const {
  getUsersController,
  deleteUserController,
  patchUserController,
  getUserByIdController,
  getUserByEmailController,
  createUserController,
} = require("../controllers/usersControllers");

//Crear un usuario nuevo en la base de datos
const createUserHandler = async (req, res) => {
  try {
    const { email, firstName, lastName, salt, password } = req.body;
    const user = await createUserController(
      email,
      firstName,
      lastName,
      salt,
      password
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//obtener todos los usuarios de la base de datos
const getUsersHandler = async (req, res) => {
  try {
    const allUsers = await getUsersController();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//eliminar un registro usuario de la base de datos
const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserController(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//actualizar los datos de un registro usuario
const patchUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await patchUserController(id, data);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//obtener un registro usuario por su id
const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdController(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//obtener un registro usuario por su email
const getUserByEmailHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmailController(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getUsersHandler,
  deleteUserHandler,
  patchUserHandler,
  getUserByIdHandler,
  getUserByEmailHandler,
  createUserHandler,
};
