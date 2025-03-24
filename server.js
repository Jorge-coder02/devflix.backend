const express = require("express");
const mongoose = require("mongoose");
// const User = require("./User"); // Quitar cuando haya usuarios en la base de datos
const cors = require("cors");
const router = require("./user_routes.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors()); // ** AQUÍ url back
app.use(express.json());
const PORT = process.env.PORT || 5000;
const { MONGODB_URI } = process.env;

// Conectar a MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB 🚀");
  })
  .catch((err) => console.error(err));

// Rutas
app.use("/", router);

// Abrir servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} ✅`);
});
