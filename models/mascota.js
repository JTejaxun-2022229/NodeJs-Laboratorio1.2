const { Schema, model } = require('mongoose');

const MascotaSchema = Schema({
    especie: {
        type: String,
        required: [true, 'La especie es obligatorio']
    },
    raza: {
        type: String,
        required: [true, 'La raza es obligatorio']
    },
    sexo: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    },
    edad: {
        type: String,
        required: [true, 'La edad es obligatorio']
    },
    img: {
        type: String
    },
    disponibilidad: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Mascota', MascotaSchema)

