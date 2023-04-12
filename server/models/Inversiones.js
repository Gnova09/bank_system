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
},
{
    paranoid: true, // Activamos eliminacion logica
});

//RELACIONES DE LAS TABLAS//
CuotaInversion.belongsTo(Inversion, { foreignKey: 'idInversion' });

module.exports = {
    Inversion,
    CuotaInversion
}