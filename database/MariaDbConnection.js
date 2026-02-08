const { Sequelize } = require('sequelize');




const bdmysql = new Sequelize(
    'parcial',
    'root',
    '',
    {
        host: 'LocalHost',
        port: '3306',
        dialect: 'mysql'
    }
);




/*exporto*/ 
module.exports = {
    bdmysql
}