const { validationResult } = require('express-validator');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const {AUTH_PASS,AUTH_USER} = process.env

const validarCampos = (req, res, next) => {
    
    // Define la estrategia de autenticación básica
    passport.use(new BasicStrategy(
        (username, password, done) => {
            if (AUTH_USER===username && AUTH_PASS === password) {
                return done(null, username); // Si las credenciales son válidas, se autentica al usuario
            }
            return done(null, false); // Si las credenciales no son válidas, se rechaza la autenticación
        }
    ));  

    //GUARDAMOS LOS ERRORES EN LA CONST//
    const isError = validationResult(req);

    //VALIDAMOS SI EXISTE UN ERROR Y LO RETORNAMOS//
    if (!isError.isEmpty()) {
        return res.status(400).json({ isError })
    }
    passport.authenticate('basic', { session: false })(req, res, next);
}

module.exports = {
    validarCampos
}