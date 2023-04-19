const { CuotaPrestamo } = require("../models/Prestamo")
const { calcMesesEntreFechas } = require("./calcMesesEntreFechas")

//Creamos la cuotas del prestamo//
const createCuotasPrestamo = async({idPrestamo, fechaBeg, fechaEnd, prestamoCantidad}) => {

    const cantDeCuotas = await calcMesesEntreFechas({fechaBeg, fechaEnd, idPrestamo, prestamoCantidad})
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