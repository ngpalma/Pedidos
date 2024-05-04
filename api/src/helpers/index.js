const crypto = require("crypto");

const SECRET = process.env.SECRET;

// Crea una cadena de caracteres aleatorios
const random = () => crypto.randomBytes(128).toString("base64");

// Forma una clave secreta a partir de una combinacion convertida a formato hexadecimal
const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(`${SECRET}`)
    .digest("hex");
};

module.exports = {
  random,
  authentication,
};
