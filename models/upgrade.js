var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/node")

var actualizar_schema = new Schema({
   id:{type: Number, required: true},
   nombre:{type: String, required: true},
   modalidad:{type: String, required: true},
   valor:{type: Number, required: true},
   descripcion:{type: String, required: true},
   intensidad:{type: Number, required: true}
});

/*
course_schema.virtual("id_repetido").get(function() {
    return this.id_repetido;
}).set(function(id){
  this.id_repetido = id;
})
*/
var Actualizar = mongoose.model("Actualizar",actualizar_schema);

module.exports = Actualizar;

