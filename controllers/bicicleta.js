var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = async function (req, res) {
    const bicicleta = await Bicicleta.find({});
    res.render('bicicletas/index', { bicis: bicicleta });
}

exports.bicicleta_create_get = function (req, res) {
    res.render('bicicletas/create')
}

exports.bicicleta_create_post = function (req, res) {
    var bici = new Bicicleta({code:req.body.id, color: req.body.color, modelo: req.body.modelo });
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = async function (req, res) {
    var bici = await Bicicleta.findById(req.params.id)

    res.render('bicicletas/update', { bici })
}

exports.bicicleta_update_post = async function (req, res) {
    var bici = await Bicicleta.findById(req.params.id)

    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    bici.save();

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = async function (req, res) {
    await Bicicleta.removeByCode(req.body.id);

    res.redirect('/bicicletas');
}

