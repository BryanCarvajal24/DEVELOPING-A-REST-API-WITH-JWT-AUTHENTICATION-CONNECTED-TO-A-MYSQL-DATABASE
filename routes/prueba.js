//Defiir ruta

const { Router } = require('express');


//traer perosnas

const { personasGet, 
        personaByIdGet,
        personasComoGet,
        personasComo1Get,
        personaPost,
        personaDelete,
        personaPut
} = require('../controllers/prueba');

//definir ruta

const router = Router();


//Intanciar variable

//SELECCIONAR TODAS LAS PERSONAS

router.get('/',
    personasGet);
    

//SELECCIONAR UNA PERSONA

router.get('/:id',
    personaByIdGet);

//http:77localhost.8082/api/personas/bucar/mar


//SELECCIONAR PERSONAS POT UN TERMINO EN LOS NOMBRES O APELLIDOS
router.get('/buscar/:termino',
    personasComoGet);
        
router.get('/buscar1/:termino',
    personasComoGet);
            


// INSERTAR UNA PERSONA EN LA TABLA DE PERSONAS

router.post('/',
    personaPost);

            

//ELIMINAR UNA PERSONA  MEDIANTE ID EN LA TABLA PERSPNA

router.delete('/:id',
    personaDelete);


//MODIFICAR UNA PERSONA  MEDIANTE ID EN LA TABLA PERSPNA

router.put('/:id',
    personaPut);

    





//Exportar router

module.exports = router;


