const Usuario = require('../../models/usuario');

exports.usuario_list = async function (req, res) {
    const usuarios = await Usuario.find({});

    res.status(200).json({
        usuarios: usuarios
    });
}

exports.usuario_create = async function (req, res) {
    var usuario = new Usuario({ nombre: req.body.nombre });

    await usuario.save();

    res.status(200).json({ usuario });
}

exports.usuario_reservar = async function (req, res) {

    const usuario = await Usuario.findById(req.body.id);
    console.log(usuario);
    await usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta);
    console.log('reserva !!!');

    res.status(200).send();
}
