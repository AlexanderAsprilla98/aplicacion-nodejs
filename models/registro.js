var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/node")

const registro_schema = new Schema({
   id_curso :{type: Number, required: true},
   nombre:{type: String, required: true},
   modalidad:{type: String},
   valor:{type: Number},
   descripcion:{type: String},
   intensidad:{type: Number},
   estado:{type: String}
});

/*
course_schema.virtual("id_repetido").get(function() {
    return this.id_repetido;
}).set(function(id){
  this.id_repetido = id;
})
*/
var Registro = mongoose.model("Registro", registro_schema);

module.exports = Registro;

