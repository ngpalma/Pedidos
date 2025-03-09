const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authToken = (req, res, next) => {
  const token =
    req.cookies.AUTH_TOKEN || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Agrega el usuario decodificado al request
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: administrador requerido" });
  }
  next();
};

module.exports = { authToken, authorizeAdmin };
