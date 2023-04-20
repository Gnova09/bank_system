const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { Cliente } = require("../models/Cliente");
const { Prestamo } = require('../models/Prestamo');

//VERIFICAR SI LA CEDULA EXISTE//
const cedulaExist = async cedula => {

    const existclient = await Cliente.findOne({ where: { cedula } })
    if (existclient) {
        throw new Error(`El cliente con ${cedula} existe`)
    }
}
//VERIFICAR SI EL CLIENTE EXISTE LOGIN//
const clientExist = async cedula => {

    const existclient = await Cliente.findOne({ where: { cedula } })
    if (!existclient) {
        throw new Error(`El cliente con cedula ${cedula} no existe`)
    }
}

//VERIFICAR SI EL CLIENTE EXISTE//
const isClientValid = async idCliente => {

    const existclient = await Cliente.findOne({ where: { idCliente } })
    if (!existclient) {
        throw new Error(`El cliente con id ${idCliente} no existe`)
    }
}

//VERIFICAR SI EL PRESTAMO EXISTE//
const isPrestamoValid = async idPrestamo => {

    const existclient = await Prestamo.findOne({ where: { idPrestamo } })
    if (!existclient) {
        throw new Error(`El cliente con id ${idPrestamo} no existe`)
    }
}

module.exports = {
    cedulaExist,
    isClientValid,
    clientExist,
    isPrestamoValid
}