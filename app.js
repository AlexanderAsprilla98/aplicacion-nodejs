var express = require("express");
var bodyParser = require("body-parser");
//var Course = require("./models/course").Course;
var session = require("express-session");
var app = express();
var fp = require('path');
var fs = require('fs');
//const port = 8080;
const port = process.env.PORT || 8080
const mongoose = require("mongoose");
const Usuario = require("./models/usuario")
const Registro = require("./models/registro")
var router = express.Router();
var methodOverride = require("method-override");
var router_app = require("./views/router_app");
var router_bet = require("./views/router_bet");
var session_middleware = require("./middlewares/session");


app.use("/public", express.static('public'));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "u23u9213921392",
    resave: false,
    saveUninitialized: false
}));


app.set("view engine", "jade");


//Modulo del usuario

app.get("/", function(req, res){

    res.render("portal");
})

//Sesion de login
app.get("/login", function(req, res){
 
    res.render("login");
})

//Sesion de formulario de registro
app.get("/registroUser", function(req, res){

    res.render("registroUser");
})

app.post("/usuario", function(req, res){
   let usuario = new Usuario({
       nombre: req.body.nombre,
       apellido: req.body.apellido,
       usuario: req.body.usuario,
       correo: req.body.correo,
       contraseña: req.body.contraseña,
       contraseña_confirmar: req.body.contraseña_confirmar
   });

   usuario.save().then(function(us){
       res.send("Guardamos el usuario exitosamente");
   }, function(err){
       if(err){
           console.log(String(err));
           res.send("Hubo un error al guardar la información");
       }
   })

})

app.post("/sessions", function(req, res){

    Usuario.findOne({correo:req.body.correo, contraseña:req.body.contrasena}, function(err, usuario){
        console.log(usuario);
        req.session.usuario_id = usuario._id;
        if(usuario._id == "5d37c2e9d36de41c50f4791f"){
            res.redirect("/app");
        }else if(usuario._id != "5d37c2e9d36de41c50f4791f"){
            res.redirect("/bet");
        }
      
    }); 
});

//Cerrar sesión
app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})

//Cerrar sesión
app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})  

app.use("/app", session_middleware);
app.use("/app", router_app);
app.use("/bet", session_middleware);
app.use("/bet", router_bet);


app.get("/ver", function(req, res){
    Registro.find({}, function(err, data){
       if(err){
          res.redirect("/"); 
          return;
       }
       res.render("ver", {dataCursos: data});
    })
  })







mongoose.connect("mongodb+srv://aasprilla:aaa319819%2A@cluster0-stt3u.mongodb.net/test?retryWrites=true&w=majority:27017", { useNewUrlParser: true }, (err, resultado)=>{
    if(err){
      return console.log("No se ha podido conectar a la BD");
    }
  console.log("Conectado");
});

app.listen(port, () => {
    console.log('Escuchando el puerto ' + port)
});
