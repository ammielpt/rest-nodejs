const {response,request}=require('express');
const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');

const usuariosGet=async(req=request, res=response) =>{
    //res.send('Hello World');
    // const {q,nombre='No name',edad,page=1,limit}=req.query;
    const {limite=5,desde=0} = req.query;
    const query= {estado:true};

    /*const usuarios= await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    const total=await Usuario.countDocuments(query);*/

    //Promise ejecuta las 2 querys en simultáneo y coloca un await 
    //para esperar la respuesta que devuelve dicha ejecucion.
     const [total,usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        usuarios
       /* msg: 'Get Api - controlador',
        q,
        nombre,
        edad,
        page,
        limit*/
    });
}

const usuariosPut= async(req=request, res=response) =>{
    //res.send('Hello World');
    const {id}=req.params;
    const {_id,password,google,correo,...resto}=req.body;

    //TODO validar contra BD
    if(password){
        //encriptar la contraseña
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);    
    }
    const usuario= await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg: 'Update Api - controlador',
        usuario
    });
}

const usuariosPost =async (req=request, res=response) =>{
    //res.send('Hello World');
    //const body=req.body;
    const {nombre,correo,password,rol}=req.body;
    //const usuario= new Usuario(body);

    const usuario= new Usuario({nombre,correo,password,rol});

    //verificar si el correo existe
    //const existeEmail= await Usuario.findOne({correo});
    //if(existeEmail){
    //    return res.status(400).json({
    //        msg: 'Ese correo ya está registrado'
    //    });
    //}
    
    //encriptar contraseña
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);
    await usuario.save();
    //const {nombre,edad}=req.body;
    res.json({
        msg: 'Post Api -contorlador',
        //nombre,edad
        usuario
    });
}

const usuariosDelete=async(req, res=response) =>{
    //res.send('Hello World');
    const {id}=req.params;
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        msg: 'Delete Api-controlador',
        usuario
    });
}

const usuariosPatch= (req, res=response) =>{
    //res.send('Hello World');
    res.json({
        msg: 'Patch Api-controlador'
    });
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};