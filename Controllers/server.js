const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb+srv://albargrrss:u9pa0KMdm5QLnyFu@clusterrelapp.ancnn.mongodb.net/Relapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error en la conexión:', err));

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});