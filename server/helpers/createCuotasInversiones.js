const { CuotaInversion } = require("../models/Inversiones")
const { calcMesesInversion } = require("./calcMesesInversion")

//Creamos la cuotas del prestamo//
const createCuotasInversion = async({idInversion, fechaBeg, fechaEnd, inversionCantidad,insteres}) => {

    const cantDeCuotas = await calcMesesInversion({fechaBeg, fechaEnd, idInversion, inversionCantidad, insteres})
    //console.log(cantDeCuotas);

        await CuotaInversion.bulkCreate(cantDeCuotas)
        .then(() => {
          console.log("Registros creados exitosamente.");
          
        })
        .catch((error) => {
          console.log("Ocurrió un error al crear los registros:", error);
          
        });
        
   
}

module.exports = {
    createCuotasInversion
}