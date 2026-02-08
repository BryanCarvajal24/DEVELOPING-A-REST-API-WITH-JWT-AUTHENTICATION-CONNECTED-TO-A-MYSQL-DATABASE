/* config una apirex basica*/ 

/*const express = require('express') 
const app = express()

app.get('/', function (req, res) {
res.send('Hola Mundo a todos...')
})

app.listen(8080)
console.log('Corriendo en el puerto 8080');*/


//configura el archivo de entorno

require('dotenv').config();

//defino el sever 

const Server = require('./models/server')

//instancio el server, que es la clase 

const server = new Server();

//y llmao el metodo server

server.listen();

