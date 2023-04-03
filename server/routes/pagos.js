const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { GetAllClient, PostNewClient, DeleteClient, GetClient } = require('../controllers/Cliente');
const { clienteExist } = require('../middlewares/validation');
const { route } = require('./cliente');

const router = Router();

//PAGOS A LAS CUOTAS DE LOS CLIENTES//
router.post('/')

