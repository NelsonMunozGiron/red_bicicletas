var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
//var server = require('../../bin/www');

var base_url = 'http://localhost:5000/api/bicicletas';

describe('Bicicleta API', () => {

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
            await Bicicleta.deleteMany({});
            console.log('Documentos eliminados');
        } catch (err) {
            console.error('Error:', err);
        }
    });


    describe('GET BICICLETAS', () => {
        it('Status 200', async () => {
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);

            var aBici = new Bicicleta({ code: 1, color: "negro", modelo: "urbana" });
            const biciAdd = await Bicicleta.add(aBici);
            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toEqual(1);

            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });


    describe('POST BICICLETAS /create', () => {
        it('Status 200', async () => {

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            }, async function (error, request, body) {
                expect(request.statusCode).toBe(200);

                const abicisFind = await Bicicleta.findByCode(10);
                expect(abicisFind.color).toBe('rojo');

            });
        });
    });

    describe('POST BICICLETAS /update', () => {
        it('Status 200', async () => {

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            }, async function (error, request, body) {
                expect(request.statusCode).toBe(200);
                const abicisFind = await Bicicleta.findByCode(10);
                expect(abicisFind.color).toBe('rojo');
            });


            var aBici2 = '{ "id": 10, "color": "azul", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: "http://localhost:5000/api/bicicletas/update",
                body: aBici
            }, async function (error, request, body) {
                expect(request.statusCode).toBe(200);
                const abicisFind = await Bicicleta.findByCode(10);
                expect(abicisFind.color).toBe('azul');
            });
        });
    });


    describe('POST BICICLETAS /delete', () => {
        it('Status 200', async () => {

            bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            }, async function (error, request, body) {
                expect(request.statusCode).toBe(200);
                bicis = await Bicicleta.allBicis();
                expect(bicis.length).toBe(1);
            });


            var aBici2 = '{ "id": 10}';
            request.post({
                headers: headers,
                url: base_url + "/delete",
                body: aBici
            }, async function (error, request, body) {
                expect(request.statusCode).toBe(200);
                bicis = await Bicicleta.allBicis();
                expect(bicis.length).toBe(0);
            });
        });
    });
});

