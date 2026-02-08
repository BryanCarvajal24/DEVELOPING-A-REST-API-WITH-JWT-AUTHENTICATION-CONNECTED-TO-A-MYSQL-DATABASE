const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');  // Ajusta la ruta según tu proyecto

// Modelo de system_state (Departamento)
const Departamento = bdmysql.define('system_state', {
    // Atributos del modelo
    'countryid': {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true
    },
    'stateid': {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true
    },
    'name': {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    'optionsStatus': {
        type: DataTypes.CHAR(8),
        allowNull: false,
        defaultValue: 'active'
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
    Departamento
};