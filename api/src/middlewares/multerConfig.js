const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Verificar si la carpeta existe y crearla si no (manera local)
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento para multer localmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Diferenciar entre imágenes y videos
    const folder = file.mimetype.startsWith("video/")
      ? "uploads/videos/"
      : "uploads/images/";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder); // Carpeta donde se almacenarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre del archivo con un sufijo único
  },
});

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/webm",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Tipo de archivo no permitido. Usa JPG, PNG, GIF, MP4 o WEBM.")
    );
  }
};

// Inicializar multer con la configuración de almacenamiento
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB máximo (ajusta según tus necesidades)
  },
});

module.exports = upload;

// Ejemplo con AWS S3 (descomenta si decides usarlo)
/*
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: s3Storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
*/