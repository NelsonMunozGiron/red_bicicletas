var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
})

bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function () {
    return 'code: ' + this.code + ' | color: ' + this.color;
};

/* bicicletaSchema.statics.allBicis = function (cb) {
    return this.find({},cb);
};
 */

bicicletaSchema.statics.allBicis = async function () {
    return await this.find({});
};

bicicletaSchema.statics.add = async function (aBici) {
    return await this.create(aBici);
};

bicicletaSchema.statics.findByCode = async function (aCode) {
    return await this.findOne({ code: aCode });
};

bicicletaSchema.statics.removeByCode = async function (aCode) {
    return await this.deleteOne({ code: aCode });
};



module.exports = mongoose.model('Bicicleta', bicicletaSchema);

/* 
var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
};

 Bicicleta.prototype.toString = function () {
    return 'id: ' + this.id + " | color: " + this.color;
}


Bicicleta.allBicis = [];
Bicicleta.add = function (aBici) {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function (aBiciId) {
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici;
    else
        throw new Error(`No existe una bicicleta con id ${aBiciId}`);
}

Bicicleta.removeById = function (aBiciId) {
    for (var i = 0; i < Bicicleta.allBicis.length; i++) {
        if (Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break
        }
    }
}


var a = new Bicicleta(1,'rojo','urbana',[14.105308114481186, -87.20506467044214]);
var b = new Bicicleta(2,'blanca','urbana',[14.105414769349698, -87.20580496006285]);
var c = new Bicicleta(3,'naranja','urbana',[14.105154635436492, -87.20417417713031]);
var d = new Bicicleta(4,'blanca','urbana',[14.105586457569828, -87.20389522741816]);
var e = new Bicicleta(5,'negra','urbana',[14.106132737410176, -87.20381476115502]);
var f = new Bicicleta(6,'negra','urbana',[14.106169156019659, -87.20413662620751]);
var g = new Bicicleta(7,'negra','urbana',[14.106320033054134, -87.20490910233346]);
var h = new Bicicleta(8,'negra','urbana',[14.106538544444286, -87.20575668030499]);
Bicicleta.add(a);
Bicicleta.add(b);
Bicicleta.add(c);
Bicicleta.add(d);
Bicicleta.add(e);
Bicicleta.add(f);
Bicicleta.add(g);
Bicicleta.add(h);


module.exports = Bicicleta;
 */