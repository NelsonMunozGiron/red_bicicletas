var Usuario = require('../models/usuario');

module.exports = {
    list: async function (req, res, next) {
        const usuarios = await Usuario.find({});
        res.render('usuarios/index', { usuarios: usuarios });
    },

    update_get: async function (req, res, next) {
        const usuario = await Usuario.findById(req.params.id);
        res.render('usuarios/update', { errors: {}, usuario: usuario });
    },

    update: async function (req, res, next) {
        var update_value = { nombre: req.body.nombre };

        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, update_value, { new: true });
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.render('usuarios/update', {
                    usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }),
                    errors: err.errors
                });
            }

            console.error(err);
            res.status(500).send('Error inesperado en la creación de usuario.');
        }

        res.redirect('/usuarios');
    },

    create_get: async function (req, res, next) {
        const ausuario = new Usuario({ nombre: 'nombre', password: 'pass', email: 'usuario@test.com' });
        res.render('usuarios/create', { errors: {}, usuario: new Usuario() });
    },

    create: async function (req, res, next) {
        if (req.body.password != req.body.confirm_password) {
            res.render('usuarios/create', { errors: { confirm_password: { message: "No coincide con el password ingresado" } }, usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email }) });
            return
        }

        let nuevoUsuario;

        try {
            const nuevoUsuario = await Usuario.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password });
            nuevoUsuario.enviar_email_bienvenida();
            res.redirect('/usuarios');
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.render('usuarios/create', {
                    usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }),
                    errors: err.errors
                });
            }

            console.error(err);
            res.status(500).send('Error inesperado en la creación de usuario.');
        }
    },

    delete: async function (req, res, next) {

        try {
            const usuario = await Usuario.findByIdAndDelete(req.body.id);
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.render('usuarios/delete', {
                    usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }),
                    errors: err.errors
                });
            }

            console.error(err);
            res.status(500).send('Error inesperado en la creación de usuario.');
        }

        res.redirect('/usuarios');
    }
}