const express = require('express');
const cors = require('cors');
const clienteRouter = require('../routes/cliente');
const prestamoRouter = require('../routes/prestamos');
const inversionRouter = require('../routes/inversion');
const pagosRouter = require('../routes/pagos');
const { dbconnection } = require('../database/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.clientPath = '/api/v1/cliente'; 
        this.prestamoPath = '/api/v1/prestamo'; 
        this.inversionPath = '/api/v1/inversion'; 
        this.pagosPath = '/api/v1/pagos'; 

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
        this.app.use(cors());
        
        //LECTURA DE JSON DE ENTRADA//
        this.app.use(express.json());
    }

    //ROUTAS DEL SERVIDO//
    routes() {
       this.app.use(this.clientPath, clienteRouter)
       this.app.use(this.prestamoPath, prestamoRouter)
       this.app.use(this.inversionPath, inversionRouter)
       this.app.use(this.pagosPath, pagosRouter)
    }

}
module.exports = Server