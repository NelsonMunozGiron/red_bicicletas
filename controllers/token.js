var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {
    confirmationGet: async function (req, res, next) {
        tokenid=req.params.token;
        console.log(await Token.find({}));

        const token = await Token.findOne({ token: tokenid });
        if (!token) {
            return res.status(400).send({ type: 'not-verified', msg: 'No encontramos un usuario con este token. Quizá haya expirado y debas solicitarlo nuevamente' });
        }
        const usuario = await Usuario.findById(token._userId);
        console.log(usuario);
        if (!usuario) {
            return res.status(400).send({ type: 'not-verified', msg: 'No encontramos un usuario con este token.' });
        }
        if (usuario.verificado) {
            return res.redirect('/usuarios');
        }
        usuario.verificado = true;

        try {
            await usuario.save();
}
        catch (error) {

            return res.status(500).send({ msg: error.message })
        }
        res.redirect('/');
    }
}