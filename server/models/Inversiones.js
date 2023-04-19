const Sequelize = require('sequelize');
const { sequelize } = require('../database/config');
const {Cliente} = require('./Cliente');


//INVERSION MODELO//
const Inversion = sequelize.define('inversion', {
    idInversion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    monto: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        allowNull: false
    },
},
{
    paranoid: true, // Activamos eliminacion logica
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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    monto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "PENDIENTE"
    },
    fechaRealizada: {
        type: Sequelize.DATE,
        allowNull: true
    },
    fechaPlanificado: {
        type: Sequelize.DATE,
        allowNull: false      
    },
    codigoComprobante: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "NO COMPLETADO"
    },
},
{
    paranoid: true, // Activamos eliminacion logica
});

//RELACIONES DE LAS TABLAS//
Inversion.hasMany(CuotaInversion, { foreignKey: 'idInversion' });
//Inversion.belongsTo(Cliente, {foreignKey: 'idCliente'})

module.exports = {
    Inversion,
    CuotaInversion
}