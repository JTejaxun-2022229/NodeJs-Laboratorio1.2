const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {
    mascotaPost,
    mascotaGet,
    getMascotaById,
    putMascota,
    mascotaDelete
} = require('../controllers/mascota.controller');
const { existeMascotaById } = require('../helpers/db-validators');

const router = Router();

router.get("/", mascotaGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], getMascotaById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], putMascota
);

router.post(
    "/",
    [
        check("especie", "La especie no puede estar vacio").not().isEmpty(),
        check("raza", "La raza no puede ir vacia").not().isEmpty(),
        check("sexo", "El sexo no puede ir vacia").not().isEmpty(),
        check("edad", "La edad no puede ir vacia").not().isEmpty(),
        validarCampos,
    ], mascotaPost
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeMascotaById),
        validarCampos
    ], mascotaDelete
);

module.exports = router;