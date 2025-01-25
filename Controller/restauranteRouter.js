const express = require('express');
const restauranteRouter = express.Router();
const Restaurante = require('../Model/restaurante');

//Crear restaurante
restauranteRouter.post('/crear', async (req, res) => {
    try {
        const { nombre, direccion, latitud, longitud, telefono, horario, categoria, descripcion, imagenURL, visitado } = req.body;
        const nuevoRestaurante = new Restaurante({ nombre, direccion, latitud, longitud, telefono, horario, categoria, descripcion, imagenURL, visitado });
        await nuevoRestaurante.save();
        res.json({ mensaje: 'Restaurante creado' });
    } catch (error) {
        res.json({ mensaje: error });
    }
});

//Obtener todos los restaurantes
restauranteRouter.get('/todos', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find();
        res.json(restaurantes);
    } catch (error) {
        res.json({ mensaje: error });
    }
});

//Obtener un restaurante por ID
restauranteRouter.get('/:id', async (req, res) => {
    try {
        const restaurante = await Restaurante.findById(req.params.id);
        res.json(restaurante);
    } catch (error) {
        res.json({ mensaje: error });
    }
});

//Actualizar un restaurante por ID
restauranteRouter.put('/actualizar/:id', async (req, res) => {
    try {
        const { nombre, direccion, latitud, longitud, telefono, horario, categoria, descripcion, imagenURL, visitado } = req.body;
        await Restaurante.findByIdAndUpdate(req.params.id, { nombre, direccion, latitud, longitud, telefono, horario, categoria, descripcion, imagenURL, visitado });
        res.json({ mensaje: 'Restaurante actualizado' });
    } catch (error) {
        res.json({ mensaje: error });
    }
});

//Eliminar un restaurante por ID
restauranteRouter.delete('/eliminar/:id', async (req, res) => {
    try {
        await Restaurante.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Restaurante eliminado' });
    } catch (error) {
        res.json({ mensaje: error });
    }
});

//Obtener restaurante por nombre
restauranteRouter.get("/nombre/:nombre", async (req, res) => {
    try {
        const { nombre } = req.params;
        console.log("Buscando por nombre:", nombre); // Verifica el filtro que llega
        const restaurantes = await Restaurante.find({
            nombre: { $regex: nombre, $options: "i" }, // Búsqueda insensible a mayúsculas/minúsculas
        });
        console.log("Resultados encontrados:", restaurantes); // Verifica los resultados
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error("Error al buscar restaurantes:", error);
        res.status(500).json({ message: "Error al buscar restaurantes" });
    }
});


//Obtener restaurante cercano por coordenadas
restauranteRouter.get('/cercano/:latitud/:longitud', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find({
            latitud: { $gte: req.params.latitud - 0.01, $lte: req.params.latitud + 0.01 },
            longitud: { $gte: req.params.longitud - 0.01, $lte: req.params.longitud + 0.01 }
        });
        res.json(restaurantes);
    } catch (error) {
        res.json({ mensaje: error });
    }
});

module.exports = restauranteRouter;