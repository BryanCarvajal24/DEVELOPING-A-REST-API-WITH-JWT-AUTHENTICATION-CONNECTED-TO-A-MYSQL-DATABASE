const { Router } = require('express');

const { validarJWT} = require('../middlewares/validar-jwt');


const { loginPost, 
        usuariosGet,
        usuariosByIdGet,
        usuarioPost,
        usuarioDelete,
        usuarioPut
        

} = require('../controllers/auth');


const router = Router();




// CONFIRMAR REGISTRO LOGIN

router.post('/login',
    loginPost);


//SELECCIONAR TODOS LOS USUARIOS

router.get('/',
    usuariosGet);
    

//SELECCIONAR UN USUSARIO

router.get('/:id',
    usuariosByIdGet);


//INSERTAR UN NUEVO USUARIO

router.post('/',
    usuarioPost);


//ELIMINAR UNA PERSONA  MEDIANTE ID EN LA TABLA USUARIO


router.delete('/:id',
    validarJWT,
    usuarioDelete);


//MODIFICAR UN USUARIO  MEDIANTE ID EN LA TABLA USUARIO

router.put('/:id',
    validarJWT,
    usuarioPut);



//Exportar router

module.exports = router;
