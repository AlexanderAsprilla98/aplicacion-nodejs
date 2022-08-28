var express = require("express");
//var Curso = require("../models/curso");
const Registro = require("../models/registro")
const Inscribir = require("../models/inscribir")
var router = express.Router();

router.get("/", function(req, res){
   res.render("bet/index");
});


router.route("/modulo")
//Muestra la tabla con los cursos creados 
  .get(function(req, res){
    Registro.find({}, function(err, data){
       if(err){
          res.redirect("/bet"); 
          return;
       }
       res.render("bet/modulo/disponible", {dataCursos: data});
      })
    })
 
//Crear estudiantes en la Base de Datos Mongoose
.post(function(req, res){
    var estudiantes = {
        documento: req.body.documento,
        correo: req.body.correo,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        curso: req.body.curso
    }

    var cursos = new Inscribir(estudiantes);
    
    Inscribir.findOne({documento : req.body.documento, curso :req.body.curso}, (err, resultados) => {
     if (err){
           return console.log(err)
     }
     if(!resultados){
        cursos.save();
        //res.redirect("/app/modulo/"+cursos._id);
        res.send("Registrado");
        console.log("Save"+resultados)
       }else{
        res.send('error');
        console.log("Error"+resultados)
     }

    }) 
})


router.get("/modulo/inscribirse", function(req, res){
    Registro.find({}, function(err, nom){
        res.render("bet/modulo/inscribir", {nombres: nom})
      })
    });




















module.exports = router;