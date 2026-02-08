const { Router } = require('express');

const { 
    DepartamentosGetByCountryId, 
    DepartamentoByIdGet,
    DepartamentoGetByName,
    DepartamentoPost,
    DepartamentoPut,
    DepartamentoDelete

} = require('../controllers/departamento');  // Asegúrate de ajustar la ruta según la estructura de tu proyecto

const router = Router();



//Ruta para buscar departamento por su nombre y el id del pais
router.get('/buscar/:countryid/:nombre',
    DepartamentoGetByName);

//Ruta para obtener departamentos por el id del pais
router.get('/:countryid', 
    DepartamentosGetByCountryId);

//Ruta para obtener un departamento por su id y el id del pais
router.get('/:countryid/:stateid', 
    DepartamentoByIdGet);

// Ruta para crear un nuevo departamento
router.post('/', 
    DepartamentoPost);

// Ruta para modificar un departamento por su ID y el ID del país
router.put('/:countryid/:stateid', 
    DepartamentoPut);

// Ruta para eliminar un departamento por su ID y el ID del país
router.delete('/:countryid/:stateid', 
    DepartamentoDelete);




module.exports = router;