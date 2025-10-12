var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
const util = require('util');
const postRequest = util.promisify(request.post);
const getRequest = util.promisify(request.get);
const delRequest = util.promisify(request.delete);
//var server = require('../../bin/www');

var base_url = 'http://localhost:5000/api/bicicletas';

describe('Bicicleta API', () => {

    beforeEach(async function () {
        const mongoDB = 'mongodb://localhost/red_bicicletas';
        try {
            await mongoose.connect(mongoDB);
            console.log('We are connecting to test database!');
        } catch (err) {
            console.error('Error connecting to DB:', err);
        }

        try {
            await Bicicleta.deleteMany({});
            console.log('Documentos eliminados');
        } catch (err) {
            console.error('Error:', err);
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

    afterAll( async function(){
        await mongoose.disconnect();
    })


    describe('GET BICICLETAS', () => {
        it('Status 200', async () => {
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);

            var aBici = new Bicicleta({ code: 1, color: "negro", modelo: "urbana" });
            const biciAdd = await Bicicleta.add(aBici);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(1);

            const reqGet = await getRequest({
                url: base_url,
            });

            expect(reqGet.statusCode).toBe(200);
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('Status 200', async () => {

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 100, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';

            reqCreate = await postRequest({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            });

            expect(reqCreate.statusCode).toBe(200);

            const reqGet = await getRequest({
                url: base_url,
            });

            const abicisFind = await Bicicleta.findByCode(100);
            expect(abicisFind.color).toBe('rojo');

            await Bicicleta.deleteOne({ code: 100 });
        });
    });


    describe('POST BICICLETAS /update', () => {
        it('Status 200', async () => {

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';

            const reqCreate = await postRequest({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            });

            expect(reqCreate.statusCode).toBe(200);
            reqGet = await getRequest({
                url: base_url,
            });

            const abicisFind = await Bicicleta.findByCode(10);
            expect(abicisFind.color).toBe('rojo');

            var aBici2 = '{ "id": 10, "color": "azul", "modelo": "urbana", "lat": -34, "lng": -54 }';
            const reqUpdate = await postRequest({
                headers: headers,
                url: base_url + "/update",
                body: aBici2
            });

            expect(reqUpdate.statusCode).toBe(200);

            reqGet = await getRequest({
                url: base_url,
            });

            const abicisFind2 = await Bicicleta.findByCode(10);
            expect(abicisFind2.color).toBe('azul');
        });
    });


    describe('POST BICICLETAS /delete', () => {
        it('Status 200', async () => {


            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            const reqCreate = await postRequest({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            });

            expect(reqCreate.statusCode).toBe(200);

            reqGet = await getRequest({
                url: base_url,
            });

            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(1);


            var aBici2 = '{ "id": 10}';
            const reqDelete = await delRequest({
                headers: headers,
                url: base_url + "/delete",
                body: aBici2
            });
            expect(reqDelete.statusCode).toBe(204);

            reqGet = await getRequest({
                url: base_url,
            });


            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });
});

