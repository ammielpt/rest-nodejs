const { Router } = require('express');
const {check}= require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido,verificarEmail,verificarUsuario } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../contollers/usuarios');

const router = Router();

router.get('/', usuariosGet)

router.put('/:id',[
        check('id','No es un id válido').isMongoId(),
        check('id').custom(verificarUsuario),
        check('rol').custom((rol)=>esRolValido(rol)),
        validarCampos
], usuariosPut)

router.post('/',[
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El password debe ser más de 6 letras').isLength({min:6}),
check('correo','El correo no es valido').isEmail(),
check('correo').custom(verificarEmail),
//check('rol','El rol no es valido').isIn('ADMIN_ROLE','USER_ROLE'),validarCampos],
check('rol').custom((rol)=>esRolValido(rol)),
validarCampos],
usuariosPost)

router.delete('/:id',[
        check('id','No es un id válido').isMongoId(),
        check('id').custom(verificarUsuario),
        validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;