const {
  createUserController,
  getUserByEmailController,
  getUserByIdController,
} = require("./usersControllers");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Debe completar todos los campos" });
    }

    // Buscar al usuario por email
    const user = await getUserByEmailController(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña con bcrypt
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar JWT con la clave secreta
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Configurar cookie con el token (opcional)
    res.cookie("AUTH_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo en producción
      sameSite: "strict", // Protege contra CSRF
    });

    // Responder con los datos del usuario y el token
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};

const registerController = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const existingUser = await getUserByEmailController(email);
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = await createUserController({
      email,
      firstName,
      lastName,
      password,
    });

    // Generar JWT
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Debe proporcionar un correo electrónico." });
  }

  const user = await getUserByEmailController(email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "No se encontró un usuario con ese correo." });
  }

  // Generar un token de restablecimiento (puede ser JWT)
  const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

  // Aquí podrías mandar el enlace al correo
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  // Implementar envío de correo con el enlace (usando Nodemailer o algún servicio de email)

  return res
    .status(200)
    .json({ message: "Enlace de restablecimiento enviado." });
};

const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Debe proporcionar un token y una nueva contraseña." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await getUserByIdController(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Actualizar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).json({ message: "Contraseña restablecida exitosamente." });
  } catch (error) {
    res.status(400).json({ message: "Token inválido o expirado." });
  }
};

const changePasswordController = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // El ID del usuario viene del JWT decodificado en el middleware de autenticación

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Debe proporcionar la contraseña actual y la nueva." });
  }

  const user = await getUserByIdController(userId);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado." });
  }

  // Verificar que la contraseña actual sea correcta
  const isPasswordValid = await user.validPassword(currentPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Contraseña actual incorrecta." });
  }

  // Hashear la nueva contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();
  res.status(200).json({ message: "Contraseña cambiada exitosamente." });
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
};
