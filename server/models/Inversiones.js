const Sequelize = require('sequelize');
const { sequelize } = require('../database/config');

//INVERSION MODELO//
const Inversion = sequelize.define('inversion', {
    idInversion: {
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

//CUOTAS DEINVERSION MODELO//
const CuotaInversion = sequelize.define('cuotainversion', {
    idCuotaInversion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idInversion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    monto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaRealizada: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaPlanificada: {
        type: Sequelize.DATE,
        allowNull: false
    },
    codigoComprobante: {
        type: Sequelize.STRING,
        allowNull: false
    },
});


module.exports = {
    Inversion,
    CuotaInversion
}