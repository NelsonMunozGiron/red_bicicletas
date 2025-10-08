var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
//const bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function () {
    /*     beforeEach(function (done) {
            var mongoDB = 'mongodb://localhost/testdb';
            mongoose.connect(mongoDB, {});  // useNewUrlParser: true  esta desactualizado
    
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error'));
            db.once('open', function () {
                console.log('We are connection to test database!');
                done();
            });
        });
    
        afterEach(function (done) {
            Bicicleta.deleteMany({}, function (err, success) {
                if (err) console.log(err);
                done();
            });
        });
     */

    beforeEach(async function () {
        const mongoDB = 'mongodb://localhost/testdb';
        try {
            await mongoose.connect(mongoDB);
            console.log('We are connection to test database!');
        } catch (err) {
            console.error('Error connecting to DB:', err);
        }
    });

    afterEach(async function () {
        try {
            await Bicicleta.deleteMany({});
            console.log('Documentos eliminados');
        } catch (err) {
            console.error('Error:', err);
        }
    });


    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);


            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-54.1);
        });
    });

    /*     describe('Bicicleta.allBicis', () => {
            it('comienza vacia', (done) => {
                Bicicleta.allBicis(function (err,bicis){
                expect(true).toBe(true)
                    //expect(bicis.length).toBe(0);
                    done();
                });
            });
        });
     */

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', async () => {
            const bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });

    describe('Bicicleta.add', () => {
        it('agregar solo una vici', async () => {
            var aBici=new Bicicleta({code:1,color:"verde",modelo:"urbana"});
            const bicis = await Bicicleta.add(aBici);
            expect(bicis.length).toEqual(1);
            expect(bicis[0].code).toEqual(aBici.code);
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', async () => {
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);

            var aBici1=new Bicicleta({code:1,color:"verde",modelo:"urbana"});
            const bicisAdd1 = await Bicicleta.add(aBici1);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(1);

            var aBici2=new Bicicleta({code:2,color:"rojo",modelo:"urbana"});
            const bicisAdd2 = await Bicicleta.add(aBici2);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(2);

            const abicisFind = await Bicicleta.findByCode(1);
            expect(abicisFind.code).toBe(aBici1.code);
            expect(abicisFind.color).toBe(aBici1.color);
            expect(abicisFind.modelo).toBe(aBici1.modelo);
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe crear 2 bicicletas, remover la numero 1 y devolver la bici con code 2', async () => {
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);

            var aBici1=new Bicicleta({code:1,color:"verde",modelo:"urbana"});
            const bicisAdd1 = await Bicicleta.add(aBici1);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(1);

            var aBici2=new Bicicleta({code:2,color:"rojo",modelo:"urbana"});
            const bicisAdd2 = await Bicicleta.add(aBici2);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(2);

            const biciRemove=await Bicicleta.removeByCode(1);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(1);


            const abicisFind = await Bicicleta.findByCode(2);
            expect(abicisFind.code).toBe(aBici2.code);
            expect(abicisFind.color).toBe(aBici2.color);
            expect(abicisFind.modelo).toBe(aBici2.modelo);
        });
    });
});

/* beforeEach(() => { Bicicleta.allBicis = []; });

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [14.105308114481186, -87.20506467044214]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1,"verde", "urbana");
        var aBici2 = new Bicicleta(2,"rojo", "montaña");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});

describe('Bicicleta.removeById', () => {
    it('debe devolver que no encontro la vici 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1,"verde", "urbana");
        Bicicleta.add(aBici);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    });
}); */