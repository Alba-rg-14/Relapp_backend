const mongoose = require('mongoose');

const RestauranteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    telefono: {
        type: String,
        required: false
    },
    horario: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenURL: {
        type: String,
        required: false
    },
    visitado: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Restaurante', RestauranteSchema);    