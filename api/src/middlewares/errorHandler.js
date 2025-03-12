const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Ocurrió un error inesperado";
  // Logging detallado en desarrollo, mínimo en producción
  if (process.env.NODE_ENV === "development") {
    console.error(
      `[${req.method} ${req.originalUrl}] Error ${status}:`,
      err.stack
    );
  } else {
    console.error(
      `[${req.method} ${req.originalUrl}] Error ${status}: ${message}`
    );
  }
  // Respuesta estandarizada como JSON
  res.status(status).json({
    status: status,
    message:
      status === 500 && process.env.NODE_ENV === "production"
        ? "Error interno del servidor"
        : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Solo en desarrollo
  });
};

module.exports = errorHandler;
