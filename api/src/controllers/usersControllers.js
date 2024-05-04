const { User } = require("../db");

//Crear un nuevo usuario en la base de datos
const createUserController = async ({
  email,
  firstName,
  lastName,
  salt,
  password,
}) => {
  const [newUser, created] = await User.findOrCreate({
    where: {
      email,
      firstName,
      lastName,
      salt,
      password,
    },
  });

  if (!created)
    return "El usuario ya se encuentra registrado en la base de datos";
  return newUser;
};

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

const getUserByEmailController = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  getUsersController,
  patchUserController,
  deleteUserController,
  getUserByIdController,
  getUserByEmailController,
  createUserController,
};
