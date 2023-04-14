const { validationResult } = require('express-validator');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;


const validarCampos = (req, res, next) => {

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