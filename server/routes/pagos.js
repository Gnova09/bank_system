const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { isPrestamoValid } = require('../middlewares/validation');
const { PostPagarCuota } = require('../controllers/Pagos');
//const { clienteExist } = require('../middlewares/validation');

const router = Router();

//PAGOS A LAS CUOTAS DE LOS CLIENTES//
router.post('/:idPrestamo',[
    check('idPrestamo', 'Error en el prestamo').notEmpty(),
    check('idPrestamo', 'Error en el prestamo').custom(isPrestamoValid),
    validarCampos
],PostPagarCuota())

module.exports= router