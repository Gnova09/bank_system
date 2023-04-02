const express = require('express');
//const cors = require('cors');
const usuarios = require('../routes/usuarios');
const { dbconnection } = require('../database/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.userPath = '/api/v1/usuarios'; 

        //CONECTAR A LA BD//
        this.conexionDB()
        //MIDDLEWARES//
        this.middlewares()

        //ROUTAS DEL API//
        this.routes()

    }

    //CONEXION A LA BD//
    async conexionDB(){
        await dbconnection();
    }
    //INICIANDO EL SERVIDOR//
    listen() {

        this.app.listen(this.port, () => {
            console.log('Listening on port:', this.port);
        })
    }

    //MIDDLEWARES//
    middlewares() {
        //DIRECTORIO PUBLICO//
        //this.app.use(express.static('public'))
        //ACTIVAR EL USO DE CORS//
        //this.app.use(cors());
        //LECTURA DE JSON DE ENTRADA//
        this.app.use(express.json());
    }

    //ROUTAS DEL SERVIDO//
    routes() {
       this.app.use(this.userPath, usuarios)
    }

}
module.exports = Server