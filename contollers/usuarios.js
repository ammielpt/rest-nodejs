const {response,request}=require('express');


const usuariosGet=(req=request, res=response) =>{
    //res.send('Hello World');
    const {q,nombre='No name',edad,page=1,limit}=req.query;
    res.json({
        msg: 'Get Api - controlador',
        q,
        nombre,
        edad,
        page,
        limit
    });
}

const usuariosPut= (req=request, res=response) =>{
    //res.send('Hello World');
    const {id}=req.params;
    const {nombre}=req.body;
    res.json({
        msg: 'Update Api - controlador',
        id,nombre
    });
}

const usuariosPost =(req=request, res=response) =>{
    //res.send('Hello World');
    const {nombre,edad}=req.body;
    res.json({
        msg: 'Post Api -contorlador',
        nombre,edad
    });
}

const usuariosDelete=(req, res=response) =>{
    //res.send('Hello World');
    res.json({
        msg: 'Delete Api-controlador'
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