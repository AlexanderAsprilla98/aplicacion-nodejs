var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/node")
var correo_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Colaca un email valido"];

const inscribir_schema = new Schema({
   documento: {type: Number, required: true},
   correo:{type: String, required: "El Correo es obligatorio", match: correo_match},
   nombre:{type: String},
   telefono:{type: Number},
   curso:{type: String}
});


var Inscribir = mongoose.model("Inscribir", inscribir_schema);

module.exports = Inscribir;