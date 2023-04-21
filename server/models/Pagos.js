const Sequelize = require('sequelize');
const { sequelize } = require('../database/config');

const Pagos = sequelize.define('pagos', {
    idPago: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idCuota: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idCuenta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaRealizado: {
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

module.exports ={
    Pagos
}