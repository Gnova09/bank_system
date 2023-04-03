const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
    //GUARDAMOS LOS ERRORES EN LA CONST//
    const isError = validationResult(req);

    //VALIDAMOS SI EXISTE UN ERROR Y LO RETORNAMOS//
    if (!isError.isEmpty()){
        return res.status(400).json({isError})
    }
    next()
}

module.exports = {
    validarCampos
}