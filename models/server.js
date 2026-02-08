/*referencia a las librerias  no importa la uni*/ 

const express = require('express')

const cors = require('cors')

/*importar la base de datos que se deinio hayá y se importa acá, hace referencia a la base de datos
toca hacer referencia a la que estamos definiendo nostros */ 

const { bdmysql } = require('../database/MariaDbConnection');

require('dotenv').config(); 


//Instansear la clase


class Server {
    constructor() {
        this.app = express();    //instanciamos laaplicacion deexpress
        this.port = process.env.PORT;   //Cojems el puerto de .env



        
        this.pathsMySql = {
            auth: '/api/auth',
            personas: '/api/personas',
            pais: '/api/pais',
            departamento: '/api/departamento',
            municipio: '/api/municipio',
        }

        

//Ruta para saludar 

        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos...DESDE UNA CLASE')
        })
        

        //Aqui me conecto a la BaseDe datos
        this.dbConnection();

        //definir Middlewares
        this.middlewares();


        //Routes
        this.routes();

    }

    async dbConnection() {
        try {
            await bdmysql.authenticate();  //Esperar a que se conecte 
            console.log('Connection OK a MySQL OK.');

        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    
    routes() {
        this.app.use(this.pathsMySql.auth, require('../routes/auth'));
        this.app.use(this.pathsMySql.personas, require('../routes/prueba'));  
        this.app.use(this.pathsMySql.pais, require('../routes/pais')); 
        this.app.use(this.pathsMySql.departamento, require('../routes/departamento')); 
        this.app.use(this.pathsMySql.municipio, require('../routes/municipio')); 
    }   

    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON
        /*
        JSON (JavaScript Object Notation) 
        es un formato ligero de intercambio de datos. 
        JSON es de fácil lectura y escritura para los usuarios. 
        JSON es fácil de analizar y generar por parte de las máquinas. 
        JSON se basa en un subconjunto del lenguaje de programación JavaScript, 
        Estándar ECMA-262 3a Edición - Diciembre de 1999.
        */
        //son los middle wors

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public')); 
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


/*exportamos la clase*/ 

module.exports = Server;