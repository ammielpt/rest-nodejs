const express = require('express');
const cors= require('cors');

class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, res) =>{
            //res.send('Hello World');
            res.json({
                msg: 'Get Api'
            });
        })

        this.app.put('/api', (req, res) =>{
            //res.send('Hello World');
            res.json({
                msg: 'Update Api'
            });
        })

        this.app.post('/api', (req, res) =>{
            //res.send('Hello World');
            res.json({
                msg: 'Post Api'
            });
        })

        this.app.delete('/api', (req, res) =>{
            //res.send('Hello World');
            res.json({
                msg: 'Delete Api'
            });
        })

        this.app.patch('/api', (req, res) =>{
            //res.send('Hello World');
            res.json({
                msg: 'Patch Api'
            });
        })
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en puerto',this.port);
        });
    }    
}

module.exports=Server;