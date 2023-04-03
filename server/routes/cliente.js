const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const {
    GetAllClient,
    PostNewClient,
    DeleteClient,
    GetClient,
    GetCuentaBanco,
    PostNewCuentaBanco,
    GetDeleteCuentaBanco 
} = require('../controllers/Cliente');
const { clienteExist, isClientValid } = require('../middlewares/validation');

const router = Router();

//RETORNAR TODOS LOS CLIENTES//
router.get('/', GetAllClient())

//RETORNAR EL CLIENTE//
router.get('/:idCliente', [
    check('idCliente', 'Error en la cedula').notEmpty(),
    validarCampos
], GetClient())

//CREAR UN NUEVO CLIENTE//
router.post('/new', [
    check('cedula', 'Error en la cedula').notEmpty(),
    check('cedula', 'Ya Existe').custom(clienteExist),
    check('nombre', 'Indicar el nombre').notEmpty(),
    check('apellido', 'Indicar el apellido').notEmpty(),
    check('direccion', 'Indicar el direccion').notEmpty(),
    check('telefono', 'Indicar el telefono').notEmpty(),
    validarCampos
], PostNewClient())

//ELIMINAR CLIENTE//
router.delete('/delete/:idCliente', [
    check('idCliente', 'Error en la cedula').notEmpty(),
    validarCampos
], DeleteClient())

//OBTENER LA CUENTA DEL BANCO DEL CLIENTE//
router.get('/cuentabanco/:idCliente', [
    //VERIFICAR QUE EL CLIENTE EXISTE//
    check('idCliente', 'Error en la cedula').notEmpty(),
    check('idCliente', 'No es un cliente existente').custom(isClientValid),
    validarCampos
], GetCuentaBanco())

//CREAR LA CUENTA DEL BANCO DEL CLIENTE//
router.post('/cuentabanco/new', [
    check('idCliente', 'Error en la idCliente').notEmpty(),
    check('idCliente', 'No Existe').custom(isClientValid),
    check('numero', 'Indicar el numero').notEmpty(),
    check('banco', 'Indicar el banco').notEmpty(),
    check('tipo', 'Indicar el tipo').notEmpty(),
    validarCampos
], PostNewCuentaBanco())

//ELIMINAR LA CUENTA DEL BANCO DEL CLIENTE//
router.delete('/cuentabanco/delete/', [
    //VERIFICAR QUE LA CUENTA EXISTE//
    check('idCuenta', 'Error en la idCuenta').notEmpty(),
    check('idCliente', 'Error en la idCliente').notEmpty(),
    validarCampos
], GetDeleteCuentaBanco())

module.exports = router
