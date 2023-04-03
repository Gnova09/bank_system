const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { GetAllClient, PostNewClient, DeleteClient, GetClient } = require('../controllers/Cliente');
const { clienteExist } = require('../middlewares/validation');

const router = Router();

//RETORNAR TODOS LOS CLIENTES//
router.get('/', GetAllClient())

//RETORNAR EL CLIENTE//
router.get('/:idCliente', [
    check('idCliente','Error en la cedula').notEmpty(),
    validarCampos
], GetClient())

//CREAR UN NUEVO CLIENTE//
router.post('/new', [
    check('cedula','Error en la cedula').notEmpty(),
    check('cedula','Ya Existe').custom(clienteExist),
    check('nombre','Indicar el nombre').notEmpty(),
    check('apellido','Indicar el apellido').notEmpty(),
    check('direccion','Indicar el direccion').notEmpty(),
    check('telefono','Indicar el telefono').notEmpty(),
    validarCampos
] ,PostNewClient())

//ELIMINAR CLIENTE//
router.delete('/delete/:idCliente', [
    check('idCliente','Error en la cedula').notEmpty(),
    validarCampos
] ,DeleteClient())

module.exports = router
