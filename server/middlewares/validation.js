const { Cliente } = require("../models/cliente")

//VERIFICAR SI LA CEDULA EXISTE//
const cedulaExist = async cedula => {
  
    const existclient = await Cliente.findOne({where:{cedula}})
   if(existclient){
    throw new Error(`El cliente con ${cedula} existe`)
   }
}
//VERIFICAR SI EL CLIENTE EXISTE LOGIN//
const clientExist = async cedula => {
  
    const existclient = await Cliente.findOne({where:{cedula}})
   if(!existclient){
    throw new Error(`El cliente con cedula ${cedula} no existe`)
   }
}

//VERIFICAR SI EL CLIENTE EXISTE//
const isClientValid = async idCliente => {
  
    const existclient = await Cliente.findOne({where:{idCliente}})
   if(!existclient){
    throw new Error(`El cliente con id ${idCliente} no existe`)
   }
}

module.exports = {
    cedulaExist,
    isClientValid,
    clientExist
}