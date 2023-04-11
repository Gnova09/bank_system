const { Inversion } = require("../models/Inversiones")
const { Cliente} = require("../models/cliente")


//CREAR UN Inversion//
const PostNewInversion = ()=>(req,res)=>{
    const {monto,insteres, fechaEnd,fechaBeg} = req.body
    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Inversion.create({monto,insteres,fechaBeg,fechaEnd, idCliente})
    .then((inversion)=>{
        res.json(inversion)
    })
    .catch((err)=>{
        console.log('Error al cargar:' + err);
        res.status(400).json('Error al cargar ');
    })
}

//PRESTAMO POR CLIENTE//
const GetInversionByClient = ()=>(req,res)=>{
    
    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Cliente.findByPk(idCliente, {
        include:[
            {
                model: Inversion
            }
        ],
        attributes: {
            exclude: ['password']
          },
    })
    .then((client)=>{
        res.json(client)
    })
    .catch((err)=>{
        console.log('Error al cargar:' + err);
        res.status(400).json('Error al cargar ');
    })

}


module.exports={
PostNewInversion,
GetInversionByClient
}