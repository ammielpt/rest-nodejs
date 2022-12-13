const express = require('express');
const cors= require('cors');
const {dbConnection}=require('../database/config');

//Middleware son funciones que añade otra 
//funcionalidad a nuestro web server

class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        //conectar a BD
        this.conectarBD();
        this.middlewares();
        this.routes();
    }

    async conectarBD(){
      await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto',this.port);
        });
    }    
}

module.exports=Server;