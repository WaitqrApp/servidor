const mongoose = require('mongoose');

const EtiquetaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    disponible:{
        type: Boolean,
        default: true,
    },
    platillo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platillo'
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    restaurante:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurante'
    },
    nombreetiqueta:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NombreEtiqueta'
    },
    registro:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Etiqueta', EtiquetaSchema)