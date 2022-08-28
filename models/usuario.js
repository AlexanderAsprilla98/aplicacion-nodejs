var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var correo_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Colaca un email valido"];

const user_schema = new Schema({
    nombre:{type: String, required: "El Nombre es obligatorio"},
    apellido:{type: String, required: "El Apellido es obligatorio"},
    usuario:{type: String, required: "El Usuario es obligatorio", maxlength: [50, "Nombre de Usuario muy grande"]},
    correo:{type: String, required: "El Correo es obligatorio", match: correo_match},
    contraseña:{type: String, required: "La contraseña es obligatorio", minlength: [8, "La contraseña es muy corta"]}
});
 
//Confirmar contraseña
user_schema.virtual("contraseña_confirmar").get(function() {
     return this.c_c;
 }).set(function(contraseña){
   this.c_c = contraseña;
 });
 
 var Usuario = mongoose.model("Usuario", user_schema);
 
 module.exports = Usuario;
 