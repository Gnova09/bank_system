const bcrypt = require('bcryptjs');
const { Cliente, CuentaBanco } = require("../models/Cliente")

//----------//CONTROLADORES DE LOS CLIENTES//--------------//

//LOGEAR CLIENTE
const PostLoginClient = () => async (req, res) => {
    const { cedula, password } = req.body;
    const clientpass= await Cliente.findOne({
        where:{cedula},
        attributes: ['password'],
    })
   
    //COMPARE HASH//
    bcrypt.compare(password, clientpass.password)
    .then((response)=>{
        response ?
        res.status(200).json({ mensaje: 'Contraseña correcta' }):
        res.status(401).json({ error: 'Credenciales inválidas' });
    })
}

//RETORNAR TODOS LOS CLIENTES
const GetAllClient = () => async (req, res) => {

    await Cliente.findAll({
        include: [
            {
                model: CuentaBanco,
                              
            }
        ],
        attributes: {
            exclude: ['password']
        },
    })
        .then((cliente) => {
            res.json(cliente);
        })
        .catch((err) => {
            console.log('Error al cargar el cliente:' + err);
            res.status(400).json('Error al cargar el cliente');
        })

}

//RETORNAR UN CLIENTE
const GetClient = () => async (req, res) => {
    const idCliente = req.params.idCliente

    await Cliente.findOne({
        where: { idCliente },
        include: [
            {
                model: CuentaBanco
            }
        ],
        attributes: {
            exclude: ['password']
        },
    })
        .then((cliente) => {
            res.json(cliente);

        })
        .catch((err) => {
            console.log('Error al cargar el cliente:' + err);
            res.status(400).json('Error al cargar el cliente');
        })
}

//CREAR UN CLIENTE
const PostNewClient = () => async (req, res) => {

    const { cedula, nombre, apellido, password, direccion, telefono } = req.body

    //ENCRYPTAMOS LA CONTRASEÑA
    const ClientPassword = await bcrypt.hash(password, 8);

    //CREAMOS EL CLIENTE EN LA BBDD
    await Cliente.create({
        cedula,
        nombre,
        password: ClientPassword,
        apellido,
        direccion,
        telefono
    })
        .then(async ({ idCliente }) => {

            await CuentaBanco.create({
                idCliente: idCliente,
                banco: "Popular",
                tipo: 'Ahorros',
            })
                .then(({ idCuenta }) => {

                    res.json({ idCliente, idCuenta });
                })
                .catch((err) => {
                    console.log('Error al cargar la cuenta:' + err);
                    res.status(400).json('Error al cargar la cuenta');
                })
        })
        .catch((err) => {
            console.log('Error al cargar el cliente:' + err);
            res.status(400).json('Error al cargar el cliente');
        })

}

//ELIMINAR UN CLIENTE
const DeleteClient = () => async (req, res) => {
    const idCliente = req.params.idCliente
    await Cliente.destroy({
        where: { idCliente }
    })
        .then(() => {
            res.json(`Cliente con el id ${idCliente} Eliminado`);

        })


}

//----------//CONTROLADORES DE  LAS CUENTAS DE BANCOS DEL CLIENTE//--------------//

//RETORNAR LA CUENTA DEL BANCO DEL CLIENTE, JUNTO CON EL CLIENTE//
const GetCuentaBanco = () => async (req, res) => {
    const idCliente = req.params.idCliente
    await CuentaBanco.findAll({
        where: {
            idCliente
        }
    })
        .then((cuenta) => {
            res.json(cuenta)
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })
}

//CREAR CUENTA DE BANCO//
const PostNewCuentaBanco = () => async (req, res) => {
    const { idCliente, numero = 0, banco = 'Popular', tipo = "Ahorros" } = req.body;

    await CuentaBanco.create({
        idCliente,
        numero,
        banco,
        tipo,
    })
        .then((cuenta) => {
            res.json(cuenta)
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar');
        })
}

//ELIMINAR LA CUENTA//
const GetDeleteCuentaBanco = () => async (req, res) => {
    const { idCuenta, idCliente } = req.body

    await CuentaBanco.destroy({
        where: {
            idCuenta,
            idCliente
        }
    })
        .then((response) => {
            res.json('Cuenta eliminada')
        })
        .catch((err) => {
            console.log('Error al cargar:' + err);
            res.status(400).json('Error al cargar ');
        })
}

module.exports = {
    PostLoginClient,
    GetAllClient,
    PostNewClient,
    DeleteClient,
    GetClient,
    GetCuentaBanco,
    PostNewCuentaBanco,
    GetDeleteCuentaBanco
}