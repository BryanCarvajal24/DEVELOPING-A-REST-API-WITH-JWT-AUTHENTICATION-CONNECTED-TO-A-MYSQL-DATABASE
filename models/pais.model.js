const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');  // Ajusta la ruta según tu proyecto

// Modelo de system_country
const Pais = bdmysql.define('system_country',
    {
        // Atributos del modelo
        'countryid': {
            type: DataTypes.STRING(5),
            primaryKey: true,
            allowNull: false
        },
        'country': {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        'callingCode': {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        'flag': {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        'currency': {
            type: DataTypes.STRING(255),
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
    }
);

module.exports = {
    Pais
};
