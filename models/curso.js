var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var curso_schema = new Schema({
    estado:{type:String, required: true}
});

var Curso = mongoose.model("Curso", curso_schema);

module.exports = Curso;