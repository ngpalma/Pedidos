const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Verificar si la carpeta existe y crearla si no
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se almacenarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre del archivo con un sufijo único
  },
});

// Inicializar multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

module.exports = upload;
