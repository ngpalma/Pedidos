const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-please-change-me"; // Fallback para desarrollo

const authToken = (req, res, next) => {
  // Prioridad: header > cookie
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.AUTH_TOKEN) {
    token = req.cookies.AUTH_TOKEN;
  }

  if (!token) {
    return res
      .status(401)
      .json({
        status: 401,
        message: "No se proporcionó token de autenticación",
      });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role, ... }
    next();
  } catch (error) {
    console.error(`[Auth Error] Invalid token: ${error.message}`);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: 401, message: "Token expirado" });
    }
    return res.status(401).json({ status: 401, message: "Token inválido" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      status: 403,
      message: "Acceso denegado: se requiere rol de administrador",
    });
  }
  next();
};

// Bonus: Middleware genérico para roles
const authorizeRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({
      status: 403,
      message: `Acceso denegado: se requiere uno de los roles ${roles.join(
        ", "
      )}`,
    });
  }
  next();
};

module.exports = { authToken, authorizeAdmin, authorizeRole };
