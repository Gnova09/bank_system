const { Cliente } = require("../models/cliente")

const GetAllClient=()=>async (req,res)=>{

    await Cliente.findAll()   
    .then((cliente)=>{
        res.json(cliente);
    })
    .catch((err)=>{
        console.log('Error al cargar el cliente:' + err);
        res.status(400).json('Error al cargar el cliente');
    })

}

const GetClient=()=>async (req,res)=>{3
    const idCliente = req.params.idCliente

     await Cliente.findOne({
        where: {idCliente}
    })
    .then((cliente)=>{
        res.json(cliente);
    })
    .catch((err)=>{
        console.log('Error al cargar el cliente:' + err);
        res.status(400).json('Error al cargar el cliente');
    })


}

const PostNewClient=()=>async (req,res)=>{

    const {cedula,nombre,apellido,direccion,telefono} = req.body

    await Cliente.create({
        cedula,
        nombre,
        apellido,
        direccion,
        telefono
    })
    .then( (cliente)=>{
        
        res.json(cliente);
    })
    .catch((err)=>{
        console.log('Error al cargar el cliente:' + err);
        res.status(400).json('Error al cargar el cliente');
    })

}

const DeleteClient = ()=>async (req,res)=>{
    const idCliente = req.params.idCliente
    await Cliente.destroy({
        where:{idCliente}
    })
    .then(()=>{
        res.json(`Cliente con el id ${idCliente} Eliminado`);
        
    })


}


module.exports = {
    GetAllClient,
    PostNewClient,
    DeleteClient,
    GetClient
}