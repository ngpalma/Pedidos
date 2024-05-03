import { createUserHandler, getUserByEmailHandler } from "../handlers/usersHandlers";
import { random, authentication } from "../helpers";

export const loginController = async (email, password) => {
  if (!email || !password) return "Debe completar todos los campos";

  const user = await getUserByEmailHandler(email);

  if (!user || !user.authentication || !user.authentication.salt)
    return "Error en la autenticación del usuario";

  const expectedHash = authentication(user.salt, password);

  if (user.password !== expectedHash) return "Contraseña incorrecta";

  const salt = random();
  user.sessionToken = authentication(salt, user.id.toString());

  await user.save();
  return user;
};

export const registerController = async (
  email,
  password,
  firstName,
  lastName
) => {
  if (!email || !password || !firstName || !lastName) return "Faltan datos";

  const existingUser = await getUserByEmailHandler(email);
  if (existingUser) return "El usuario ya existe";

  const salt = random();
  const user = await createUserHandler({
    email,
    firstName,
    lastName,
    salt,
    password: authentication(salt, password),
  });
  return user;
};
