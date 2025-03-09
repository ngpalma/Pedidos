const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Ocurrió un error inesperado";
  console.error(err);
  res.status(status).send(message);
};

module.exports = errorHandler;
