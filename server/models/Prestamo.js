const Sequelize = require('sequelize');
const { sequelize } = require('../database/config');
const { Cliente } = require("./Cliente")

//PRESTAMO MODELO//
const Prestamo = sequelize.define('prestamo', {
    idPrestamo: {
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
    montoMasIntereses: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    montoFaltante: {
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

//GARANTIA MODELO//
const Garantia = sequelize.define('garantia', {
    idGarantia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPrestamo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: true
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    paranoid: true, // Activamos eliminacion logica
});

//CUOTA DEL PRESAMO MODELO//
const CuotaPrestamo = sequelize.define('cuotaprestamo', {
    idCuota: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPrestamo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "PENDIENTE"
    },
    monto: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fechaPlanificado: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaRealizado: {
        type: Sequelize.DATE,
        allowNull: true
    },
    codigoComprobante: {
        type: Sequelize.STRING,
        allowNull: true,
    },
},
{
    paranoid: true, // Activamos eliminacion logica
});

//RELACIONES DE LAS TABLAS//
Prestamo.hasOne(Garantia, { foreignKey: 'idPrestamo' });
Prestamo.hasMany(CuotaPrestamo, { foreignKey: 'idPrestamo' });
//CuotaPrestamo.belongsTo(Prestamo, { foreignKey: 'idPrestamo' });
//Prestamo.belongsTo(Cliente, {foreignKey: 'idCliente'})


module.exports = {
    Prestamo,
    Garantia,
    CuotaPrestamo
}