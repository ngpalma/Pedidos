const { User } = require("../db");

//obtener todos los usuarios de la base de datos
const getUsersController = async () => {
  const allUsers = User.findAll();
  if (!allUsers) return "No hay usuarios registrados en la base de datos";
  return allUsers;
};

//actualizar todos o algunos datos de un usuario si es que existe
const patchUserController = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return "No se encontro al usuario que quiere actualizar";
  const updatedUser = await user.update(data);
  return updatedUser;
};

//eliminar un usuario existente de la base de datos
const deleteUserController = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return "No se encontro al usuario o ya fue eliminado";
  const deletedUser = await user.destroy();
  return deletedUser;
};

//encontrar un usuario en la base de datos por su id
const getUserByIdController = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = {
  getUsersController,
  patchUserController,
  deleteUserController,
  getUserByIdController,
};
