const { Cliente, CuentaBanco } = require("../models/cliente")
const { Prestamo } = require("../models/Prestamo")

const GetAllClient = () => async (req, res) => {

    await Cliente.findAll({
        include: [
            {
                model: CuentaBanco
            }
        ]
    })
        .then((cliente) => {
            res.json(cliente);
        })
        .catch((err) => {
            console.log('Error al cargar el cliente:' + err);
            res.status(400).json('Error al cargar el cliente');
        })

}

const GetClient = () => async (req, res) => {
    const idCliente = req.params.idCliente

    await Cliente.findOne({
        where: { idCliente },
        include:[
            {
                model:CuentaBanco
            }
        ]
    })
        .then((cliente) => {
            res.json(cliente);

        })
        .catch((err) => {
            console.log('Error al cargar el cliente:' + err);
            res.status(400).json('Error al cargar el cliente');
        })
}

const PostNewClient = () => async (req, res) => {

    const { cedula, nombre, apellido, direccion, telefono } = req.body

    await Cliente.create({
        cedula,
        nombre,
        apellido,
        direccion,
        telefono
    })
        .then(async (cliente) => {

            await CuentaBanco.create({
                idCliente: cliente.idCliente,
                banco:"Popular",
                tipo:'Ahorros',
            })
                .then((cuenta) => {

                    res.json({ cliente, cuenta });
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

const DeleteClient = () => async (req, res) => {
    const idCliente = req.params.idCliente
    await Cliente.destroy({
        where: { idCliente }
    })
        .then(() => {
            res.json(`Cliente con el id ${idCliente} Eliminado`);

        })


}

//CONTROLADORES DE  LAS CUENTAS DE BANCOS DEL CLIENTE//

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
    const { idCliente, numero=0, banco='Popular', tipo="Ahorros" } = req.body;

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
    GetAllClient,
    PostNewClient,
    DeleteClient,
    GetClient,
    GetCuentaBanco,
    PostNewCuentaBanco,
    GetDeleteCuentaBanco
}