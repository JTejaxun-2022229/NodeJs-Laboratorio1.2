const Mascota = require('../models/mascota');
const response = require('express');

const mascotaGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { disponibilidad: true };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaById = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascota
    });
}

const putMascota = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const mascota = await Mascota.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Mascota Actualizado Exitosamente',
        mascota
    });
}

const mascotaDelete = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findByIdAndUpdate(id, { disponibilidad: false });

    res.status(200).json({
        msg: 'Mascota Eliminado Exitosamente',
        mascota
    });
}

const mascotaPost = async (req, res) => {
    const { especie, raza, sexo, edad } = req.body;
    const mascota = new Mascota({ especie, raza, sexo, edad });

    await mascota.save();
    res.status(202).json({
        mascota
    })
}

module.exports = {
    mascotaPost,
    mascotaGet,
    getMascotaById,
    putMascota,
    mascotaDelete
}