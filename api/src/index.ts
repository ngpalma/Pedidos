import express, { Request, Response } from "express";

// Configurar Express
const app = express();
app.use(express.json());
const port = 3000;

// Configurar conexión a PostgreSQL

// Ruta de ejemplo
app.get("/", async (req: Request, res: Response) => {
  console.log("GET DE PRUEBA");
  res.send("Get correcto");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
