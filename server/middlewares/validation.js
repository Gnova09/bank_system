const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const { Cliente } = require("../models/cliente")

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

//VERIFICAR SI EL CLIENTE EXISTE//
const isTokenValid = async idCliente => {

    const users = {
        'apiProduction': 'wb7wi3p8ecd5u916o7gj' // Aquí se almacenan las credenciales de los usuarios permitidos
    };

    // Define la estrategia de autenticación básica
    passport.use(new BasicStrategy(
        (username, password, done) => {
            if (users[username] === password) {
                return done(null, username); // Si las credenciales son válidas, se autentica al usuario
            }
            return done(null, false); // Si las credenciales no son válidas, se rechaza la autenticación
        }
    ));
        
}

module.exports = {
    cedulaExist,
    isClientValid,
    clientExist,
    isTokenValid
}