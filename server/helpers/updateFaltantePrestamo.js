const { sequelize } = require("../database/config")
const { CuotaPrestamo, Prestamo } = require("../models/Prestamo")


const updateFaltantePrestamo = async ({ idPrestamo, idCuota }) => {
   await  CuotaPrestamo.findByPk(idCuota)
        .then(async(cuota) => {
           await Prestamo.update(
                {
                    montoFaltante:  sequelize.literal(`montoFaltante - ${cuota.monto}`)
                },
                {
                    where: { idPrestamo }
                })
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
        })
}

module.exports = {
    updateFaltantePrestamo
}