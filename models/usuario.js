var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
const bicicleta = require('./bicicleta');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

const Token = require('./token');
const mailer = require('../mailer/mailer');

var Schema = mongoose.Schema;

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio.']
    },
    email: {
        type: String,
        trim: true,
        required: [true, "El email es obligatorio."],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email válido.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio."],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario' });

usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = async function (biciId, desde, hasta) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    await reserva.save();
};

usuarioSchema.methods.enviar_email_bienvenida = async function () {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') })
    const email_destination = this.email;
    try {
        await token.save()
    }
    catch (errors) {
        return console.log(errors.message);
    }
    const mailOptions = {
        from: 'no-reply@redbiciceltas.com',
        to: email_destination,
        subject: 'Verificación de cuenta',
        text: 'Hola.\n\n' + 'Por favor verificar su cuenta haga click en el link: \n' + 'http://localhost:5000/token/confirmation/' + token.token + '\n'
    };

    try {
        await mailer.sendMail(mailOptions,)
    }
    catch (errors) {

        return console.log(errors.message);
    }
    console.log('Se ha enviado un email de bienvenida a: ' + email_destination + '.');
}
module.exports = mongoose.model('Usuario', usuarioSchema);