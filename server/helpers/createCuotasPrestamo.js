const { CuotaPrestamo } = require("../models/Prestamo")
const { calcTotalPrestamoInteres } = require("./calcMesesPrestamo")

//Creamos la cuotas del prestamo//
const createCuotasPrestamo = async({idPrestamo, fechaBeg, fechaEnd, monto,insteres}) => {

    const cantDeCuotas = await calcTotalPrestamoInteres({fechaBeg, fechaEnd, idPrestamo, monto, insteres})
    //console.log(cantDeCuotas);

        await CuotaPrestamo.bulkCreate(cantDeCuotas)
        .then(() => {
          console.log("Registros creados exitosamente.");
          
        })
        .catch((error) => {
          console.log("Ocurrió un error al crear los registros:", error);
          
        });
        
   
}

module.exports = {
    createCuotasPrestamo
}