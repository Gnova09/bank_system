const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { isPrestamoValid, isClientValid } = require('../middlewares/validation');
const { PostPagarCuota, GetPagos } = require('../controllers/Pagos');
//const { clienteExist } = require('../middlewares/validation');

const router = Router();

//PAGOS A LAS CUOTAS DE LOS CLIENTES//
router.post('/:idPrestamo',[
    check('idPrestamo', 'Error en el prestamo').notEmpty(),
    check('idPrestamo', 'Error en el prestamo').custom(isPrestamoValid),
    check('idCliente', 'Error en la cliente').notEmpty(),
    check('idCliente','Error en el cliente').custom(isClientValid),
    validarCampos
],PostPagarCuota())

//RETORNAR HISTORIAL DE PAGO DE UN CLIENTE//
router.get('/historial/:idCliente',[
    check('idCliente', 'Error en la cliente').notEmpty(),
    check('idCliente','Error en el cliente').custom(isClientValid),
    validarCampos
],GetPagos() )

module.exports= router