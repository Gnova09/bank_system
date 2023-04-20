const { Prestamo, Garantia, CuotaPrestamo } = require("../models/Prestamo")
const { Cliente } = require("../models/Cliente");
const { createCuotasPrestamo } = require("../helpers/createCuotasPrestamo");
const { calcPrestamoMasInteres } = require("../helpers/calcPrestamoMasInteres");


//CREAR UN PRESTAMO//
const PostNewPrestamo = () => async (req, res) => {
    const { monto, insteres, fechaEnd, fechaBeg, garantia = null } = req.body
    const idCliente = req.params.idCliente;
    const montoMasIntereses = await calcPrestamoMasInteres({fechaBeg, fechaEnd, monto, insteres}) //Total a pagar del prestamo
    const montoFaltante = montoMasIntereses

    //CREAMOS EL PRESTAMO//
    await Prestamo.create({ monto, insteres, fechaBeg, fechaEnd, idCliente, montoMasIntereses, montoFaltante })
        .then(async (prestamo) => {
            if (garantia !== null) {
                //SI EXISTE UNA GARANTIA LA CREAMOS//
                await Garantia.create({
                    idPrestamo: prestamo.idPrestamo,
                    tipo: garantia.tipo,
                    valor: garantia.valor,
                    ubicacion: garantia.ubicacion,
                    nombre: garantia.nombre ?? null
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
                fechaBeg,
                fechaEnd,
                monto,
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