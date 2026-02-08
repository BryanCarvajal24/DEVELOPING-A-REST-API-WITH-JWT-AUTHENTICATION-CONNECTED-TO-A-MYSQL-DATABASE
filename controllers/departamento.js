const { response, request } = require('express');
const { Departamento } = require('../models/departamento.model'); 
const { Pais } = require('../models/pais.model');
const { bdmysql } = require('../database/MariaDbConnection');
const { Op } = require("sequelize");




const DepartamentosGetByCountryId = async (req = request, res = response) => {

    // Obtener el countryid desde los parámetros de la URL
    const { countryid } = req.params;

    try {
        // Validar que se haya proporcionado el parámetro countryid
        if (!countryid) {
            return res.status(400).json({
                ok: false,
                msg: 'Debe proporcionar el countryid del país'
            });
        }

        // Consulta para obtener los departamentos (states) de un país específico
        const departamentos = await Departamento.findAll({
            where: {
                countryid: countryid,  // Filtrar por el countryid recibido
                optionsStatus: 'active'  // Solo traer los departamentos activos
            }
        });

        // Si no se encuentran departamentos, devolver un mensaje
        if (departamentos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron departamentos para el país con id: ${countryid}`
            });
        }

        // Respuesta exitosa con los departamentos encontrados
        res.json({
            ok: true,
            msg: `Departamentos del país con id: ${countryid}`,
            data: departamentos
        });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error.message
        });
    }
};


const DepartamentoByIdGet = async (req = request, res = response) => {

    // Obtener los parámetros countryid y stateid desde la URL
    const { countryid, stateid } = req.params;

    try {
        // Validar que se hayan proporcionado ambos parámetros
        if (!countryid || !stateid) {
            return res.status(400).json({
                ok: false,
                msg: 'Debe proporcionar el countryid y el stateid'
            });
        }

        // Consulta para obtener el departamento específico por countryid y stateid
        const departamento = await Departamento.findOne({
            where: {
                countryid: countryid,  // Filtrar por el countryid
                stateid: stateid,      // Filtrar por el stateid
                optionsStatus: 'active'  // Solo traer el departamento si está activo
            }
        });

        // Si no se encuentra el departamento, devolver un mensaje
        if (!departamento) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el departamento con id: ${stateid} en el país con id: ${countryid}`
            });
        }

        // Respuesta exitosa con el departamento encontrado
        res.json({
            ok: true,
            msg: `Departamento con id: ${stateid} en el país con id: ${countryid}`,
            data: departamento
        });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error.message
        });
    }
};


const DepartamentoGetByName = async (req = request, res = response) => {
    // Obtener el countryid y el nombre del departamento desde los parámetros de la URL
    const { countryid, nombre } = req.params;

    try {
        // Buscar el país por su countryid
        const pais = await Pais.findOne({
            where: {
                countryid: countryid,  // Buscar el país por su ID
                optionsStatus: 'active'  // Solo países activos
            }
        });

        // Si no se encuentra el país, devolver un error
        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró ningún país con el ID: ${countryid}`
            });
        }

        // Buscar departamentos por nombre y countryid
        const departamentos = await Departamento.findAll({
            where: {
                countryid: countryid,  // Filtrar los departamentos por el countryid
                name: { [Op.like]: `%${nombre}%` },  // Busca departamentos cuyo nombre contenga el término
                optionsStatus: 'active'  // Solo traer los departamentos activos
            }
        });

        // Si no se encuentran departamentos, devolver un mensaje
        if (departamentos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron departamentos con el nombre: ${nombre} en el país con ID: ${countryid}`
            });
        }

        // Respuesta exitosa con los departamentos encontrados
        res.json({
            ok: true,
            msg: `Departamentos del país con ID: ${countryid} que contienen el nombre: ${nombre}`,
            data: departamentos
        });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error.message
        });
    }
};



const DepartamentoPost = async (req = request, res = response) => {
    const { countryid, name, stateid } = req.body;  // Datos que se enviarán en el body de la solicitud

    try {
        // Validar que el país (countryid) exista
        const pais = await Pais.findOne({
            where: { countryid: countryid }
        });

        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró ningún país con el ID: ${countryid}`
            });
        }

        // Crear un nuevo departamento en la base de datos
        const nuevoDepartamento = await Departamento.create({
            countryid,
            stateid,
            name,
            optionsStatus: 'active'  // Siempre se crea como 'active'
        });

        res.status(201).json({
            ok: true,
            msg: 'Departamento creado exitosamente',
            data: nuevoDepartamento
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error.message
        });
    }
};


const DepartamentoPut = async (req = request, res = response) => {
    const { countryid, stateid } = req.params;  // Obtener countryid y stateid de los parámetros de la URL
    const { name, optionsStatus } = req.body;   // Datos a actualizar del body

    try {
        // Validar que el país exista
        const pais = await Pais.findOne({
            where: { countryid: countryid }
        });

        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró ningún país con el ID: ${countryid}`
            });
        }

        // Buscar el departamento por countryid y stateid
        const departamento = await Departamento.findOne({
            where: { countryid: countryid, stateid: stateid }
        });

        if (!departamento) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el departamento con ID: ${stateid} en el país con ID: ${countryid}`
            });
        }

        // Actualizar los datos del departamento
        departamento.name = name || departamento.name;  // Actualizar solo si hay un nuevo nombre
        departamento.optionsStatus = optionsStatus || departamento.optionsStatus;  // Actualizar solo si se pasa un nuevo estado

        await departamento.save();  // Guardar los cambios en la base de datos

        res.json({
            ok: true,
            msg: 'Departamento actualizado exitosamente',
            data: departamento
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error.message
        });
    }
};


const DepartamentoDelete = async (req = request, res = response) => {
    const { countryid, stateid } = req.params;  // Obtener countryid y stateid de los parámetros de la URL

    try {
        // Buscar el departamento por countryid y stateid
        const departamento = await Departamento.findOne({
            where: { countryid: countryid, stateid: stateid }
        });

        if (!departamento) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el departamento con ID: ${stateid} en el país con ID: ${countryid}`
            });
        }

        // Eliminar el departamento
        await Departamento.destroy({
            where: { countryid: countryid, stateid: stateid }
        });

        res.json({
            ok: true,
            msg: 'Departamento eliminado exitosamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            error: error.message
        });
    }
};





module.exports = {
    DepartamentosGetByCountryId,
    DepartamentoByIdGet,
    DepartamentoGetByName,
    DepartamentoPost,
    DepartamentoPut,
    DepartamentoDelete,

};





