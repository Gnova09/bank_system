const { Prestamo, Garantia, CuotaPrestamo } = require("../models/Prestamo")
const { Cliente } = require("../models/Cliente");
const { createCuotasPrestamo } = require("../helpers/createCuotasPrestamo");


//CREAR UN PRESTAMO//
const PostNewPrestamo = () => async (req, res) => {
    const { monto, insteres, fechaEnd, fechaBeg, garantia = null } = req.body
    const idCliente = req.params.idCliente;

    //CREAMOS EL PRESTAMO//
    await Prestamo.create({ monto, insteres, fechaBeg, fechaEnd, idCliente })
        .then(async (prestamo) => {
            if (garantia !== null) {
                //SI EXISTE UNA GARANTIA LA CREAMOS//
                await Garantia.create({
                    idPrestamo: prestamo.idPrestamo,
                    tipo: garantia.tipo,
                    valor: garantia.valor,
                    ubicacion: garantia.ubicacion,
                })
                    .then((garantia) => {
                        //RESPONDEMOS CON LA GARANTIA & PRESTAMO CREADO//
                        res.json({ prestamo, garantia });
                    })
                    .catch((err) => {
                        //Error en la creacion//
                        console.log('Error al cargar:' + err);
                        res.status(400).json('Error al cargar ');
                    })
            } else {
                res.json(prestamo)
            }
               //CREAMOS LAS CUOTAS DE LOS PRESTAMOS//
               await createCuotasPrestamo({
                idPrestamo: prestamo.idPrestamo,
                fechaBeg: fechaBeg,
                fechaEnd: fechaEnd,
                prestamoCantidad: monto,
                insteres
            })
        }).catch((err) => {
            //ERROR AL CREAR EL PRESTAMO//
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })
}

//PRESTAMO POR CLIENTE//
const GetPrestamoByClient = () => (req, res) => {

    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Prestamo.findAll({
        where:{
            idCliente
        },
        include: [
            {
                model: Garantia
            },
            {
                model: CuotaPrestamo
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
    PostNewPrestamo,
    GetPrestamoByClient
}