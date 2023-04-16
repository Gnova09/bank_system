const { Prestamo, Garantia } = require("../models/Prestamo")
const { Cliente} = require("../models/Cliente")


//CREAR UN PRESTAMO//
const PostNewPrestamo = ()=> async (req,res)=>{
    const {monto,insteres, fechaEnd,fechaBeg,garantia=null} = req.body
    const idCliente = req.params.idCliente;

    //CREAMOS EL PRESTAMO//
    await Prestamo.create({monto,insteres,fechaBeg,fechaEnd, idCliente})
    .then(async(Prestamo)=>{
        if(garantia!==null){
            //SI EXISTE UNA GARANTIA LA CREAMOS//
            await Garantia.create({
                idPrestamo: Prestamo.idPrestamo,
                tipo: garantia.tipo,
                valor: garantia.valor,
                ubicacion: garantia.ubicacion,
            })
            .then((garantia)=>{
                //RESPONDEMOS CON LA GARANTIA & PRESTAMO CREADO//
                res.json({Prestamo,garantia});
            })
            .catch((err)=>{
                //Error en la creacion//
                console.log('Error al cargar:' + err);
                res.status(400).json('Error al cargar ');
            })
        }else{
            res.json(Prestamo)
        }
    }).catch((err)=>{
        //ERROR AL CREAR EL PRESTAMO//
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
                model: Prestamo,
                include:{
                    model: Garantia
                }
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