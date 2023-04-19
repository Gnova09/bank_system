const { Inversion, CuotaInversion } = require("../models/Inversiones")
const { Cliente } = require("../models/Cliente");
const { createCuotasInversion } = require("../helpers/createCuotasInversiones");


//CREAR UN Inversion//
const PostNewInversion = () => (req, res) => {
    const { monto, insteres, fechaEnd, fechaBeg } = req.body
    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Inversion.create({ monto, insteres, fechaBeg, fechaEnd, idCliente })
        .then(async (inversion) => {
            
            //CREAMOS LAS CUOTAS DE LOS PRESTAMOS//
            await createCuotasInversion({
                idInversion: inversion.idInversion,
                fechaBeg: fechaBeg,
                fechaEnd: fechaEnd,
                inversionCantidad: monto,
                insteres
            })
            res.json(inversion)
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })
}

//PRESTAMO POR CLIENTE//
const GetInversionByClient = () => (req, res) => {

    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Inversion.findAll({
        where: {
            idCliente
        },
        include: [
            {
                model: CuotaInversion
            }
        ]
    })
        .then((client) => {
            res.json(client)
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })

}


module.exports = {
    PostNewInversion,
    GetInversionByClient
}