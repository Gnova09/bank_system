const { Prestamo, Garantia } = require("../models/Prestamo")
const { Cliente} = require("../models/cliente")


//CREAR UN PRESTAMO//
const PostNewPrestamo = ()=>(req,res)=>{
    const {monto,insteres, fechaEnd,fechaBeg} = req.body
    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Prestamo.create({monto,insteres,fechaBeg,fechaEnd, idCliente})
    .then((Prestamo)=>{
        res.json(Prestamo)
    })
    .catch((err)=>{
        console.log('Error al cargar:' + err);
        res.status(400).json('Error al cargar ');
    })
}

//PRESTAMO POR CLIENTE//
const GetPrestamoByClient = ()=>(req,res)=>{
    
    const idCliente = req.params.idCliente;

    //CREAMOS LA FACTURA//
    Cliente.findByPk(idCliente, {
        include:[
            {
                model: Prestamo
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
PostNewPrestamo,
GetPrestamoByClient
}