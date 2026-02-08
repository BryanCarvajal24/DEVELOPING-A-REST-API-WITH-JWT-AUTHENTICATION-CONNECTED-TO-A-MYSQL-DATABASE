const { Router } = require('express');


const { PaisGet, 
        PaisByIdGet, 
        PaisByNameGet, 
        PaisPost, 
        PaisPut, 
        PaisDelete 

} = require('../controllers/pais');

const router = Router();




// Ruta para obtener todos los países
router.get('/', 
    PaisGet);

// Ruta para obtener un país por su ID
router.get('/:id', 
    PaisByIdGet);

// Ruta para buscar países por nombre
router.get('/buscar/:termino', 
    PaisByNameGet);

// Ruta para crear un nuevo país
router.post('/', 
    PaisPost);

// Ruta para actualizar un país existente
router.put('/:id', 
    PaisPut);

// Ruta para eliminar un país
router.delete('/:id', 
    PaisDelete);




module.exports = router;
