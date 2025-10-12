var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function () {

    beforeEach(async function () {
        const mongoDB = 'mongodb://localhost/testdb';
        try {
            await mongoose.connect(mongoDB);
            console.log('We are connecting to test database!');
        } catch (err) {
            console.error('Error connecting to DB:', err);
        }
    });

    afterEach(async function () {
        try {
            await Reserva.deleteMany({});
            await Usuario.deleteMany({});
            await Bicicleta.deleteMany({});
            console.log('Documentos Usuarios, Reservas y Bicicletas eliminados');
        } catch (err) {
            console.error('Error:', err);
        }
    });


    describe('Cuando un usuario reserva una bici', () => {
        it('debe existir la reserva', async () => {
            const usuario = new Usuario({ nombre: 'Nelson', password:'prueba', email:'prueba@abc.com' })
            await usuario.save();
            const bicicleta = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
            await bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            await usuario.reservar(bicicleta.id, hoy, mañana);
            const reservas = await Reserva.find({}).populate('bicicleta').populate('usuario').exec();
            expect(reservas.length).toBe(1);
            expect(reservas[0].diasDeReserva()).toBe(2);
            expect(reservas[0].bicicleta.code).toBe(1);
            expect(reservas[0].usuario.nombre).toBe(usuario.nombre)

        });
    });
});