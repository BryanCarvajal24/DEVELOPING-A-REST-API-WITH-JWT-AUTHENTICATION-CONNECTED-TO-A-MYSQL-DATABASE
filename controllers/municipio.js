const { response, request } = require('express');
const { Municipio } = require('../models/municipio.model');
const { Departamento } = require('../models/departamento.model'); 
const { Pais } = require('../models/pais.model');
const { bdmysql } = require('../database/MariaDbConnection');
const { Op } = require("sequelize");



const MunicipiosGetByDepartment = async (req = request, res = response) => {
    const { countryid, stateid } = req.params; // Obtener countryid y stateid de los parámetros de la URL

    try {
        const municipios = await Municipio.findAll({
            where: { countryid: countryid, stateid: stateid, optionsStatus: 'active' }
        });

        if (municipios.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron municipios para el país con ID: ${countryid} y el departamento con ID: ${stateid}`
            });
        }

        res.json({
            ok: true,
            msg: `Municipios del país con ID: ${countryid} y del departamento con ID: ${stateid}`,
            data: municipios
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


const MunicipioByIdGet = async (req = request, res = response) => {
    const { countryid, stateid, cityid } = req.params;

    try {
        const municipio = await Municipio.findOne({
            where: { countryid, stateid, cityid, optionsStatus: 'active' }
        });

        if (!municipio) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el municipio con ID: ${cityid} en el país con ID: ${countryid}`
            });
        }

        res.json({
            ok: true,
            msg: `Municipio encontrado`,
            data: municipio
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


const MunicipioGetByName  = async (req = request, res = response) => {
    const { stateid, nombre } = req.params; // Obtener el stateid y el nombre del municipio

    try {
        const municipios = await Municipio.findAll({
            where: {
                stateid: stateid,
                name: { [Op.like]: `%${nombre}%` }, // Busca municipios cuyo nombre contenga el término
                optionsStatus: 'active'
            }
        });

        if (municipios.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontraron municipios con el nombre: ${nombre} en el departamento con ID: ${stateid}`
            });
        }

        res.json({
            ok: true,
            msg: `Municipios encontrados en el departamento con ID: ${stateid}`,
            data: municipios
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


const MunicipioPost = async (req = request, res = response) => {
    const { cityid, name, name2, countryid, stateid, dane, type, latitud, longitud } = req.body;

    try {
        const nuevoMunicipio = await Municipio.create({
            cityid,
            name,
            name2,
            countryid,
            stateid,
            dane,
            type,
            latitud,
            longitud,
            optionsStatus: 'active'  // Se establece como activo por defecto
        });

        res.status(201).json({
            ok: true,
            msg: 'Municipio creado exitosamente',
            data: nuevoMunicipio
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


const MunicipioPut = async (req = request, res = response) => {
    const { countryid, stateid, cityid } = req.params; // Obtener countryid, stateid y cityid de los parámetros de la URL
    const {
        name,
        name2,
        optionsStatus,
        dane,
        type,
        latitud,
        longitud
    } = req.body; // Recibe los nuevos valores desde el body

    try {
        const municipio = await Municipio.findOne({
            where: { countryid, stateid, cityid }
        });

        if (!municipio) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el municipio con ID: ${cityid} en el país con ID: ${countryid}`
            });
        }

        // Actualizar los campos del municipio
        municipio.name = name || municipio.name;
        municipio.name2 = name2 || municipio.name2;
        municipio.optionsStatus = optionsStatus || municipio.optionsStatus;
        municipio.dane = dane || municipio.dane;
        municipio.type = type || municipio.type;
        municipio.latitud = latitud || municipio.latitud;
        municipio.longitud = longitud || municipio.longitud;

        await municipio.save(); // Guardar los cambios en la base de datos

        res.json({
            ok: true,
            msg: 'Municipio actualizado exitosamente',
            data: municipio
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


const MunicipioDelete = async (req = request, res = response) => {
    const { countryid, stateid, cityid } = req.params;

    try {
        const municipio = await Municipio.findOne({
            where: { countryid, stateid, cityid }
        });

        if (!municipio) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el municipio con ID: ${cityid} en el país con ID: ${countryid}`
            });
        }

        await Municipio.destroy({
            where: { countryid, stateid, cityid }
        });

        res.json({
            ok: true,
            msg: 'Municipio eliminado exitosamente'
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
    MunicipiosGetByDepartment,
    MunicipioByIdGet,
    MunicipioGetByName,
    MunicipioPost,
    MunicipioPut,
    MunicipioDelete
};
