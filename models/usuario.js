var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bicicleta = require('./bicicleta');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = async function (biciId, desde, hasta) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    console.log(reserva);
    await reserva.save();
};

module.exports = mongoose.model('Usuario', usuarioSchema);