const { updateFaltantePrestamo } = require("../helpers/updateFaltantePrestamo");
const { CuotaPrestamo } = require("../models/Prestamo")



const PostPagarCuota = () => async (req, res) => {
    const { idCuota, tipo } = req.body;
    const idPrestamo = req.params.idPrestamo

    const fechaRealizado = new Date();
    const codigoComprobante = `C${idCuota}P${idPrestamo}T${new Date().getTime()}`


    await CuotaPrestamo.update(
        {
            tipo,
            fechaRealizado,
            codigoComprobante
        },
        {
            where: { idCuota, idPrestamo, fechaRealizado: null }
        }
    )  .then((cuota) => {
            if (cuota[0] !== 0) 
            {
                res.json('CUOTA PAGADA')
                updateFaltantePrestamo({idCuota,idPrestamo})
            }
            else res.json("CUOTA PAGADA CON ANTERIORIDAD") 
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })
}

module.exports = {
    PostPagarCuota
}