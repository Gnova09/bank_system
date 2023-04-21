const { sequelize } = require("../database/config");
const { updateFaltantePrestamo } = require("../helpers/updateFaltantePrestamo");
const { CuentaBanco } = require("../models/Cliente");
const { Pagos } = require("../models/Pagos");
const { CuotaPrestamo } = require("../models/Prestamo")

const crearPago = async ({ fechaRealizado, codigoComprobante, idCuenta, idCuota, idCliente, idPrestamo, tipo, res }) => {
    //crear pago y actualizar//
    
    await CuotaPrestamo.update(
        {
            tipo,
            fechaRealizado,
            codigoComprobante
        },
        {
            where: { idCuota, idPrestamo, fechaRealizado: null }
        }
    ).then((cuota) => {
        if (cuota[0] !== 0) {
            res.json("CUOTA PAGADA")
             Pagos.create({ fechaRealizado, codigoComprobante, idCuenta, idCuota, idCliente })
            updateFaltantePrestamo({ idCuota, idPrestamo })
        } else {res.json('CUOTA PAGADA CON ANTERIORIDAD')}
    })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })
}

const PostPagarCuota = () => async (req, res) => {
    const { idCuota, tipo, idCuenta, idCliente } = req.body;
    const idPrestamo = req.params.idPrestamo

    const fechaRealizado = new Date();
    const codigoComprobante = `C${idCuota}P${idPrestamo}T${new Date().getTime()}`

    //validar y restar el monto//
    await CuotaPrestamo.findByPk(idCuota)
        .then(async (cuota) => {
            await CuentaBanco.findByPk(idCuenta)
                .then(async (cuenta) => {
                    if (cuenta.numero >= cuota.monto) {
                        await CuentaBanco.update({
                            numero: sequelize.literal(`numero - ${cuota.monto}`)
                        }, { where: { idCuenta } }).then(() => {
                            crearPago({ fechaRealizado, codigoComprobante, idCuenta, idCuota, idCliente, idPrestamo, tipo, res })
                        })
                    } else res.json('INSUFICIENTE DINERO')
                }).catch((err) => {
                    console.log('Error al cargar:' + err);
                    res.status(400).json('Error al cargar ');
                })
        }).catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })


}

const GetPagos = () => async (req, res) =>{

    const idCliente = req.params.idCliente;

    await Pagos.findAll({where:{idCliente}})
    .then((historial)=>{
        res.json(historial)
    }).catch((err) => {
        console.log('Error al cargar:' + err);
        res.status(400).json('Error al cargar ');
    })
}

module.exports = {
    PostPagarCuota,
    GetPagos
}