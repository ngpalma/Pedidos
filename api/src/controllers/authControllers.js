const {
  createUserController,
  getUserByEmailController,
  getUserByIdController,
} = require("./usersControllers");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const nodemailer = require("nodemailer")

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Debe completar todos los campos" });
    }

    // Buscar al usuario por email
    const user = await getUserByEmailController(email);

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "Usuario no encontrado" });
    }

    // Verificar contraseña con bcrypt
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: 401, message: "Contraseña incorrecta" });
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
    res.status(200).json({
      status: 200,
      message: "Inicio de sesión exitoso",
      data: { id: user.id, email: user.email, role: user.role, token },
    });
  } catch (error) {
    next(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ status: 400, message: "Faltan datos" });
    }

    const existingUser = await getUserByEmailController(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: "El usuario ya existe" });
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

    res.cookie("AUTH_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res
      .status(201)
      .json({
        status: 201,
        message: "Usuario registrado exitosamente",
        data: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          token,
        },
      });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Debe proporcionar un correo electrónico.",
        });
    }

    const user = await getUserByEmailController(email);

    if (!user) {
      return res
        .status(404)
        .json({
          status: 404,
          message: "No se encontró un usuario con ese correo.",
        });
    }

    // Generar un token de restablecimiento (puede ser JWT)
    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Aquí podrías mandar el enlace al correo
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Restablecer Contraseña",
      text: `Haz clic aquí para restablecer tu contraseña: ${resetLink}`,
    });

    return res
      .status(200)
      .json({ status: 200, message: "Enlace de restablecimiento enviado." });
  } catch (error) {
    next(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Debe proporcionar un token y una nueva contraseña.",
        });
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await getUserByIdController(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "Usuario no encontrado." });
    }

    // Actualizar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res
      .status(200)
      .json({ status: 200, message: "Contraseña restablecida exitosamente." });
  } catch (error) {
    next(error);
  }
};

const changePasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // El ID del usuario viene del JWT decodificado en el middleware de autenticación

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({
          status: 400,
          message: "Debe proporcionar la contraseña actual y la nueva.",
        });
    }

    const user = await getUserByIdController(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "Usuario no encontrado." });
    }

    // Verificar que la contraseña actual sea correcta
    const isPasswordValid = await user.validPassword(currentPassword);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: 401, message: "Contraseña actual incorrecta." });
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res
      .status(200)
      .json({ status: 200, message: "Contraseña cambiada exitosamente." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
};
