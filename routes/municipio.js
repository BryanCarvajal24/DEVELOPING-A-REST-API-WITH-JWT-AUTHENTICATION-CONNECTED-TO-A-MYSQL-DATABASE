const { Router } = require('express');

const { 
    MunicipiosGetByDepartment, 
    MunicipioByIdGet,
    MunicipioGetByName,
    MunicipioPost,
    MunicipioPut,
    MunicipioDelete

} = require('../controllers/municipio'); 

const router = Router();



// Ruta para obtener un municipio por su nombre y el id del departamento
router.get('/buscar/:stateid/:nombre', MunicipioGetByName);

// Ruta para obtener todos los municipios por pais, departamento id
router.get('/:countryid/:stateid', MunicipiosGetByDepartment);

// Ruta para obtener un municipio por su  id y el id del pais, departamento 
router.get('/:countryid/:stateid/:cityid', MunicipioByIdGet);

// Ruta para crear un nuevo municipio
router.post('/', MunicipioPost);

// Ruta para modificar un municipio
router.put('/:countryid/:stateid/:cityid', MunicipioPut);

// Ruta para eliminar un municipio
router.delete('/:countryid/:stateid/:cityid', MunicipioDelete);





module.exports = router;