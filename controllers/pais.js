const { response, request } = require('express')
const { Pais } = require('../models/pais.model');
const { bdmysql } = require('../database/MariaDbConnection');
const { Op } = require("sequelize");




const PaisGet = async (req, res = response) => {  // Método asíncrono

    // Query params obtenidos de la URL
    const query = req.query;

    // Desestructuración de los argumentos de la query
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;

    console.log("Datos", q, nombre);  // Imprime los datos de la query
    console.log("QUERY", query);      // Imprime la query completa

    try {
        // Consulta para obtener todos los países de la tabla system_country
        const paises = await Pais.findAll();  // SELECT * FROM system_country

        // Respuesta exitosa con los datos obtenidos
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: paises  // Retorna los datos de los países
        });

    } catch (error) {
        // Manejo de errores
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}

const PaisByIdGet = async (req = request, res = response) => {

    // Obtener el parámetro ID de la URL
    const { id } = req.params;

    try {
        // Buscar el país por su clave primaria (countryid)
        const unPais = await Pais.findByPk(id);

        // Verificar si el país no existe
        if (!unPais) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un país con el id: ' + id
            });
        }

        // Respuesta exitosa con el país encontrado
        res.json({
            ok: true,
            data: unPais
        });

    } catch (error) {
        console.log(error);
        // Manejo de errores
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}

const PaisByNameGet = async (req = request, res = response) => {

    // Obtener el término de búsqueda de los parámetros de la URL
    const { termino } = req.params;

    console.log("TERMINO", termino);

    try {
        // Buscar países cuyo nombre coincida con el término de búsqueda
        const results = await Pais.findAll({
            where: {
                country: {
                    [Op.like]: `%${termino}%`  // Usar LIKE para coincidencia parcial
                }
            },
            order: [['country', 'ASC']]  // Ordenar los resultados alfabéticamente por el nombre del país
        });

        // Respuesta exitosa con los países encontrados
        res.json({
            ok: true,
            data: results
        });
        
    } catch (error) {
        console.log(error);
        // Manejo de errores
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const PaisPost = async (req, res = response) => {

    // Obtener los datos del cuerpo de la solicitud
    const { countryid, country, callingCode, flag, currency, optionsStatus } = req.body;

    const datos = req.body;

    console.log("Datos", datos);

    // Crear una nueva instancia del modelo con los datos proporcionados
    const nuevoPais = new Pais({ 
        countryid, 
        country, 
        callingCode, 
        flag, 
        currency, 
        optionsStatus 
    });

    try {
        // Guardar el nuevo país en la base de datos
        const newPais = await nuevoPais.save();

        // Responder con los datos del país creado
        res.json({
            ok: true,
            data: newPais
        });

    } catch (error) {
        console.log(error);
        // Manejo de errores
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}

const PaisPut = async (req, res = response) => {

    // Obtener el ID del país desde los parámetros de la URL
    const { id } = req.params;
    
    // Obtener el cuerpo de la solicitud (los datos que se van a actualizar)
    const { body } = req;

    console.log("ID del país:", id);
    console.log("Datos para actualizar:", body);

    try {
        // Buscar el país por su clave primaria (countryid)
        const pais = await Pais.findByPk(id);

        // Si el país no existe, retornar un 404
        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un país con el id: ' + id
            });
        }

        // Actualizar el país con los nuevos datos
        await pais.update(body);

        // Responder con el país actualizado
        res.json({ 
            ok: true, 
            data: pais 
        });

    } catch (error) {
        console.log(error);
        // Manejo de errores
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const PaisDelete = async (req, res = response) => { 
    // Obtener el ID del país desde los parámetros de la URL
    const { id } = req.params;

    console.log("ID del país a eliminar:", id);

    try {
        // Buscar el país por su clave primaria (countryid)
        const pais = await Pais.findByPk(id);

        // Si el país no existe, retornar un 404
        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un país con el id: ' + id
            });
        }

        // Eliminar el país de la base de datos
        await pais.destroy();

        // Responder con el país eliminado
        res.json({
            ok: true,
            msg: `El país con id ${id} ha sido eliminado.`,
            data: pais
        });

    } catch (error) {
        console.log(error);
        // Manejo de errores
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}





module.exports = {
    PaisGet,
    PaisByIdGet,
    PaisByNameGet,
    PaisPost,
    PaisPut,
    PaisDelete

};