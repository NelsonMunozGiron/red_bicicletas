var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = async function (req, res) {
    const bicicleta = await Bicicleta.find({});
    res.status(200).json({
        bicicletas: bicicleta
    });
}

exports.bicicleta_create = async function (req, res) {
    var bici = new Bicicleta({ code: req.body.id, color: req.body.color, modelo: req.body.modelo });
    bici.ubicacion = [req.body.lat, req.body.lng];

    const bicicleta = Bicicleta.add(bici);

    //bicicleta.save();



    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_update = function (req, res) {
    var bici = Bicicleta.findByCode(req.body.id);
    if (bici) {
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];
        Bicicleta.update(bici);
    }

    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = async function (req, res) {
    await Bicicleta.removeByCode(req.body.id);

    res.status(204).send();
}