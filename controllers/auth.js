const { response, request } = require('express')
const { Usuario} = require('../models/usuario.model');
const { bdmysql } = require('../database/MariaDbConnection');
const { Op } = require("sequelize");

//Libreria pa la encryptacion de datos
const bcryptjs = require('bcryptjs');

const { generarJWT } = require("../helpers/generar-jwt");







const loginPost = async (req, res = response) => {

    const { correo, password } = req.body;
 
    try {

        var condicion = {where : {email:correo}}

        const usuario = await Usuario.findOne(condicion);

        //console.log(usuario);

        if(!usuario){
            return res.status(400).json({ok:false,
                msg: 'Usuario no es correcto para el email ' + correo
            })
        }

        const validaPassword = bcryptjs.compareSync( password, usuario.password );
        // Verificar la contraseña

        if (!validaPassword) {
            return res.status(400).json({ok:false,
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        /*
        if (usuario.password !== password){
            return res.status(400).json({ok:false,
                msg: 'El password no es correcto para el email ' + correo
            })
        }
        */

        /*
        const validaPasword = bcryptjs.compareSync(password,usuario.password);

        if(!validaPasword){
            return res.status(400).json({ok:false,
                msg: 'El password no es correcto para el email ' + correo
            })
        }
        */ 
        
        const token = await generarJWT(usuario.id_usuario);
        

        res.json({ok:true,
            msj:'Login OK',
            token:token
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            error:error.msj
        })
    }

}


const usuariosGet = async (req, res = response) => {   //metodo asincrono 

    //QUERY
    
        const query = req.query;    
    
        //Desestructuracion de argumentos
        const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;
    
    console.log("Datos",q,nombre);   //print  que muestra esos datos
    console.log("QUERY",query);      
    
        try {
            const unosUsuarios = await Usuario.findAll(); //SELECT * FROM PERSONAS   /*ir a la base de datos y encontrar todo*/ 
            res.json({
                ok: true,
                msg: 'get API - Controller Funciono',
                query,
                q,
                nombre,
                apikey,
                page,
                limit,
                data: unosUsuarios      //retorna 
            })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el Administrador',
                err: error
            })
    
        } 
    
    }


const usuariosByIdGet = async (req = request, res = response) => {

    const { id } = req.params;
    //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const unUsuario = await Usuario.findByPk(id);

        if (!unUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una Persona con el id: ' + id
            })
        }

        res.json({
            ok: true,
            data: unUsuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}


const usuarioPost = async (req, res = response) => {

    const { id_usuario, password, email, numero_telefono, minibiografia, id_persona } = req.body;

    //const datos = req.body;

    //console.log("Datos", datos);



    const usuario = new Usuario({ password, email, numero_telefono, minibiografia, id_persona });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    try {

        const newusuario = await usuario.save();

        usuario.id_usuario = newusuario.null;

        res.json({
            ok: true,
            data: usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}


const usuarioDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);

    try {

        const usuario = await Usuario.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una usuario con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await usuario.destroy();

        res.json({
            ok: true,
            usuario: usuario,
            //autenticado:usuarioAutenticado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

const usuarioPut = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    console.log(id);
    console.log(body);

    const { password } = req.body

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una usuario con el id: ' + id
            })
        }

        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(password, salt);
        }


        await usuario.update(body);

        res.json({ ok: true, data: usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}









//Exportamos metodo

module.exports = {
    loginPost,
    usuariosGet,
    usuariosByIdGet,
    usuarioPost,
    usuarioDelete,
    usuarioPut
}