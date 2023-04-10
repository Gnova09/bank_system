const Sequelize = require('sequelize');
const { sequelize } = require('../database/config');
const { Cliente } = require("./cliente")


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

//CUOTAS DE INVERSION MODELO//
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

//RELACIONES DE LAS TABLAS//
Inversion.belongsTo(Cliente, { foreignKey: 'idCliente' });
CuotaInversion.belongsTo(Inversion, { foreignKey: 'idInversion' });

module.exports = {
    Inversion,
    CuotaInversion
}