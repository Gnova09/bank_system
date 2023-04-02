const Sequelize = require('sequelize');
const { sequelize } = require('../database/config');

//PRESTAMO MODELO//
const Prestamo = sequelize.define('prestamo', {
    idPrestamo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idCliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    monto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaBeg: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaEnd: {
        type: Sequelize.DATE,
        allowNull: false
    },
    insteres: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

//GARANTIA MODELO//
const Garantia = sequelize.define('garantia', {
    idGarantia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    idPrestamo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ubicacion:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

//CUOTA DEL PRESAMO MODELO//
const CuotaPrestamo = sequelize.define('cuotaprestamo', {
    idCuota: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    idPrestamo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaPlanificado:{
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaRealizado:{
        type: Sequelize.DATE,
        allowNull: false
    },
    codigoComprobante:{
        type: Sequelize.STRING,
        allowNull: false
    },
});


module.exports = {
    Prestamo,
    Garantia,
    CuotaPrestamo
}