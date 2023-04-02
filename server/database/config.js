const Sequelize = require('sequelize')
const {DB,DB_USER,DB_PASS,DB_HOST,DB_TYPE}=process.env //VARIABLE DE ENVIROMENT

const sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_TYPE
})

const dbconnection = async () => {

    //CONEXION DE LA BBDD//
    await sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');

    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

    //sincronizamos la tablas//
    await sequelize.sync()
        .then(() => console.log('Tablas creadas'))
        .catch(error => console.log('Error al crear las tablas', error));
}

module.exports = {
    sequelize,
    dbconnection
}