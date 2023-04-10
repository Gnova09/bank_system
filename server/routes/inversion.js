const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const {
    PostNewInversion,
    GetInversionByClient
} = require('../controllers/Inversion');
const { isClientValid } = require('../middlewares/validation');

const router = Router();

//CREAR UN PRESTAMO//
router.post('/new/:idCliente', [
    check('idCliente', 'Error en el cliente').notEmpty(),
    check('idCliente', 'Error en el cliente').custom(isClientValid),
    check('monto', 'Error en el monto').notEmpty(),
    check('insteres', 'Error en el insteres').notEmpty(),
    check('fechaBeg', 'Error en el fechaBeg').notEmpty(),
    check('fechaEnd', 'Error en el fechaEnd').notEmpty(),
    validarCampos

], PostNewInversion())

//CREAR UN PRESTAMO//
router.get('/:idCliente', [
    check('idCliente', 'Error en el cliente').notEmpty(),
    check('idCliente', 'Error en el cliente').custom(isClientValid),
    validarCampos

], GetInversionByClient())

module.exports = router