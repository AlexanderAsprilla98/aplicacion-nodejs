var express = require("express");
//var Curso = require("../models/curso");
const Registro = require("../models/registro")
const Inscribir = require("../models/inscribir")
var router = express.Router();

router.get("/", function(req, res){
   res.render("app/home");
});


/* REST */

router.get("/modulo/registro", function(req, res){
   res.render("app/modulo/registro")
});

router.get("/modulo/:id/edit", function(req, res){
   Registro.findById(req.params.id, function(err, obj){
      res.render("app/modulo/edit", {data: obj});
     })   
});

//Muestra los estudiantes registrados

router.get("/modulo/inscritos", function(req, res){
   Inscribir.find({}, function(err, olx){
      res.render("app/modulo/inscritos", {ins: olx});
   })
})





router.route("/modulo/:id")
//Muestra mensaje que el curso x fue creado exitosamente
  .get(function(req, res){
   Registro.findById(req.params.id, function(err, obj){
      res.render("app/modulo/show", {data: obj}); 
    })
  })

  .put(function(req, res){
   Registro.findById(req.params.id, function(err, obj){
      obj.estado = req.body.estado; 
      obj.save(function(err){
         if(!err){
            res.render("app/modulo/update", {data: obj}); 
         }else{
            res.render("app/modulo/"+obj.id+"/edit", {data: obj}); 
         }
      })
      
    })
  })
  .delete(function(req, res){

  });

router.route("/modulo")
//Muestra la tabla con los cursos creados 
  .get(function(req, res){
    Registro.find({}, function(err, curso){
       if(err){
          res.redirect("/app"); 
          return;
       }
       res.render("app/modulo/cursos", {cursos: curso});
    })
  })


//Crear cursos en la Base de Datos Mongoose
  .post(function(req, res){
   var mod = req.body.modalidad;

   //Validacion para que no imprima en las tablas la opcion  "Seleccione una opcion" del select
   if(mod === "Seleccione una opcion")
   {
       mod ="";
   }    

     var curso = {
        id_curso: req.body.id_curso, 
        nombre: req.body.nombre, 
        modalidad: mod, 
        valor: req.body.valor, 
        descripcion: req.body.descripcion, 
        intensidad: req.body.intensidad,
        estado: "Disponible"
     }

     var cursos = new Registro(curso);
     
     Registro.findOne({id_curso : req.body.id_curso}, (err, resultados) => {
      if (err){
			return console.log(err)
      }
      if(!resultados){
         cursos.save();
         res.redirect("/app/modulo/"+cursos._id);
         console.log("Save"+resultados)
		}else{
         res.redirect('error');
         console.log("Error"+resultados)
      }

     })  

router.get("/error", function(req, res){
   res.render("./app/modulo/errores/errorCursos");
   //console.log(listaCursos);
  })
     
})




  

module.exports = router;