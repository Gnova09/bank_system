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
    GetDeleteCuentaBanco,
    PostLoginClient,
    PostDepositoCuentaBanco
} = require('../controllers/Cliente');
const { cedulaExist, isClientValid,clientExist } = require('../middlewares/validation');

const router = Router();

//RETORNAR TODOS LOS CLIENTES//
router.post('/login',[
    check('cedula','Error en el cliente').custom(clientExist),
    validarCampos
],PostLoginClient())

//RETORNAR TODOS LOS CLIENTES//
router.get('/',[validarCampos], GetAllClient())

//RETORNAR EL CLIENTE//
router.get('/:idCliente', [
    check('idCliente', 'Error en la cedula').notEmpty(),
    check('idCliente','Error en el cliente').custom(isClientValid),
    validarCampos
], GetClient())

//CREAR UN NUEVO CLIENTE//
router.post('/new', [
    check('cedula', 'Error en la cedula').notEmpty(),
    check('cedula', 'Ya Existe').custom(cedulaExist),
    check('nombre', 'Indicar el nombre').notEmpty(),
    check('password', 'Indicar el password').notEmpty(),
    check('apellido', 'Indicar el apellido').notEmpty(),
    check('direccion', 'Indicar el direccion').notEmpty(),
    check('telefono', 'Indicar el telefono').notEmpty(),
    validarCampos
], PostNewClient())

//ELIMINAR CLIENTE//
router.delete('/delete/:idCliente', [
    check('idCliente', 'Error en la ID').notEmpty(),
    check('idCliente','Error en el cliente').custom(isClientValid),
    validarCampos
], DeleteClient())


//-------------------RUTAS DE CUENTA DE BANCO---------------------//

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
    check('idCliente', 'No es un cliente existente').custom(isClientValid),
    validarCampos
], GetDeleteCuentaBanco())

//DEPOSITAR A LA CUENTA DEL BANCO DEL CLIENTE//
router.post('/cuentabanco/deposito/', [
    //VERIFICAR QUE LA CUENTA EXISTE//
    check('idCuenta', 'Error en la idCuenta').notEmpty(),
    check('monto', 'Error en la monto').notEmpty(),
    validarCampos
], PostDepositoCuentaBanco())

module.exports = router
