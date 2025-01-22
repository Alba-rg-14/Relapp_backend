// index.js
const express = require("express");
const cors = require("cors");
const connectBD = require("./bd"); // Importa la función de conexión

const app = express();
const PORT = 5000;

// Llama a la función para conectar a la base de datos
connectBD();

// Configurar middlewares
app.use(express.json());
app.use(cors());

// Ruta básica para manejar GET /
app.get('/', (req, res) => {
    res.send("¡Bienvenido a la API del Parcial 3!");
});



const logRouter = require("./Controller/logRouter");
app.use("/log", logRouter);
/*
const imagenesRouter = require("./Controller/imagenesRouter");
app.use("/imagenes", imagenesRouter);

const mapasRouter = require("./Controller/mapasRouter");
app.use("/mapas", mapasRouter);
*/

// Rutas
const restauranteRouter = require("./Controller/RestauranteRouter");
app.use("/restaurantes", restauranteRouter);


// Iniciar servidor
app.listen(PORT, () => console.log(`Backend ready for Parcial3 ready on port ${PORT}.`));
