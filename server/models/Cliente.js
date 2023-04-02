const Sequelize = require('sequelize');
const {sequelize} = require('../database/config');


//CLIENTE MODELO//
const Cliente = sequelize.define('cliente',{
    idCliente:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    cedula:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido:{
        type: Sequelize.STRING,
        allowNull: false
    },
    direccion:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefono:{
        type: Sequelize.STRING,
        allowNull: false
    },
});


//CUENTA DE BANCO MODELO//
const CuentaBanco = sequelize.define('cuentaBanco',{
    idCliente:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idCuenta:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    numero:{
        type: Sequelize.STRING,
        allowNull: false
    },
    banco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    },
})


module.exports={
    Cliente,
    CuentaBanco
};