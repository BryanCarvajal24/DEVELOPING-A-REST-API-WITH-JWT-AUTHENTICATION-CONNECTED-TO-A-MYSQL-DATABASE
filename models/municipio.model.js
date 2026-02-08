const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');  


const Municipio = bdmysql.define('system_city', {
    
    'cityid': {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    'name': {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    'name2': {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    'countryid': {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
            model: 'system_state',  // Nombre de la tabla de departamentos
            key: 'countryid'
        }
    },
    'stateid': {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
            model: 'system_state',  // Nombre de la tabla de departamentos
            key: 'stateid'
        }
    },
    'optionsStatus': {
        type: DataTypes.CHAR(8),
        allowNull: false,
        defaultValue: 'active'
    },
    'dane': {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    'type': {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    'latitud': {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    'longitud': {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, 
{
    // Mantener el nombre de la tabla tal como está (sin pluralización)
    freezeTableName: true,

    // Desactivar las columnas createdAt y updatedAt
    createdAt: false,
    updatedAt: false
});

module.exports = {
    Municipio
};