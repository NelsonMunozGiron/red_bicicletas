
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET BICICLETAS', () => {
        it('Status 200', (done) => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'negro', 'urbana', [14.105308114481186, -87.20506467044214]);

            Bicicleta.add(a);

            request.get('http://localhost:5000/api/bicicletas', function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });


    describe('POST BICICLETAS /create', () => {
        it('Status 200', (done) => {

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: "http://localhost:5000/api/bicicletas/create",
                body: aBici
            }, function (error, request, body) {
                expect(request.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');
                done();
            });
        });
    });

    describe('POST BICICLETAS /update', () => {
        it('Status 200', (done) => {

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: "http://localhost:5000/api/bicicletas/create",
                body: aBici
            }, function (error, request, body) {
                expect(request.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');
                done();
            });


            var aBici2 = '{ "id": 10, "color": "azul", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: "http://localhost:5000/api/bicicletas/update",
                body: aBici
            }, function (error, request, body) {
                expect(request.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('azul');
                done();
            });
        });
    });


    describe('POST BICICLETAS /delete', () => {
        it('Status 200', (done) => {

            Bicicleta.allBicis=[];
            expect(Bicicleta.allBicis.length).toBe(0);

            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: "http://localhost:5000/api/bicicletas/create",
                body: aBici
            }, function (error, request, body) {
                expect(request.statusCode).toBe(200);
                expect(Bicicleta.allBicis.length).toBe(1);
                done();
            });


            var aBici2 = '{ "id": 10}';
            request.post({
                headers: headers,
                url: "http://localhost:5000/api/bicicletas/delete",
                body: aBici
            }, function (error, request, body) {
                expect(request.statusCode).toBe(200);
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            });
        });
    });
});

