const { Cliente } = require("../models/cliente")

const clienteExist = async cedula => {
  
    const existclient = await Cliente.findOne({where:{cedula}})
   if(existclient){
    throw new Error(`El cliente con ${cedula} existe`)
   }
}

module.exports = {
    clienteExist
}