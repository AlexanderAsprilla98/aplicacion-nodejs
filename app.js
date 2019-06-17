var express = require("express");
var bodyParser = require("body-parser");
//var Course = require("./models/course").Course;
var app = express();
var fp = require('path');
var fs = require('fs');
//const port = 8080;
const port = process.env.PORT || 8080
//var mongoose = require("mongoose");
//var Schema = mongoose.Schema;
//var methodOverride = require("method-override");



//mongoose.connect("mongodb://localhost/node");
listaCursos = [];
estudiantesInscritos = [];
/*
var courseSchemaJSON = {
   id:Number,
   nombre:String,
   modalidad:String,
   valor:Number,
   descripcion:String,
   intensidad:Number
};
*/

//var course_schema = new Schema(courseSchemaJSON);

//var Actuaizar = mongoose.model("Actualizar",course_schema);

app.use("/public", express.static('public'));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

//app.use(methodOverride("_method"));

app.set("view engine", "jade");

app.get("/", function(req, res){

    //res.render("index", {hola: "Hola Alexander"});
    res.render("index");
})

app.get("/registro", function(req, res){
    /*
    Course.find(function(err, doc){
         console.log(doc);
    })
    */
    res.render("registro");
    //res.render("index", {hola: "Hola Alexander"});

})

app.post("/registrar", function(req, res){
    listar();
    var mod = req.body.modalidad;

    //Validacion para que no imprima en las tablas la opcion  "Seleccione una opcion" del select
    if(mod === "Seleccione una opcion")
    {
        mod ="";
    }    

    console.log(mod);

    var course = {id: req.body.id, 
                  nombre: req.body.nombre, 
                  modalidad: mod, 
                  valor: req.body.valor, 
                  descripcion: req.body.descripcion, 
                  intensidad: req.body.intensidad,
                  estado: "Disponible"};

     
        
        console.log(course.modalidad);
        //Esta funcion es para no haber duplicado, persona que tenga el mismo id de otra
        let duplicado = listaCursos.find(nom => nom.id == req.body.id)
        //console.log(duplicado);
        if(!duplicado){
            listaCursos.push(course);
            guardar();
            res.redirect("cursos");
        }else{
            res.redirect("error");
        }
         
})

app.get("/error", function(req, res){

    res.render("./errores/errorCursos");
    //console.log(listaCursos);
})


app.get("/cursos", function(req, res){
    
    res.render("cursos", { dataCursos: listaCursos = require('./views/cursosGuardados.json')});
    //console.log(listaCursos);
        

})




app.get("/upgrade/:id", function(req, res){
    listaCursos = require('./views/cursosGuardados.json')
    var id_params = req.params;
    var obj = null;
    for (let index = 0; index < listaCursos.length; index++) {
        const element = listaCursos[index];
        if(element.id == id_params.id){
            obj = element;
        }
    }
    
        res.render("upgrade", { data: obj});

})

app.post("/upgrade/:id", function(req, res){
    listar();
    var id_params_curso = req.params;
    //var acum = 0;

    var courseActualizado = {
                  estado: req.body.estado
                };

        for (let i = 0; i < listaCursos.length; i++) {
            const elemento = listaCursos[i];
            //console.log("iteracion "+ i );
            if(elemento.id == id_params_curso.id){
                elemento.estado = courseActualizado.estado;
                //console.log(id_params_curso.id); 
                guardar();
                //acum++;
                break;
            }
        }
        res.redirect("/cursos");
        /*
        if(!acum){
            res.send("No fue posible actualizar");
                console.log(id_params_curso.id); 
                console.log("Hola "+elemento.id);
                
    }
    */
})


app.get("/inscribir", function(req, res){
    

   

    res.render("inscribir", { nombres: listaCursos = require('./views/cursosGuardados.json')});
    
      

})

app.post("/inscrito", function(req, res){
    listarCursos();
    var insCurso = {documento: req.body.documento, 
                  correo: req.body.correo, 
                  nombre: req.body.nombre, 
                  telefono: req.body.telefono, 
                  curso: req.body.curso};

    //Buscar en la el json de estudiantes cuando  el curso y documento sean igulaes a los  del formulario            
    let doc = estudiantesInscritos.find(td => (td.curso == req.body.curso &&  td.documento == req.body.documento));    


    //let doc = estudiantesInscritos.find(td => td.documento == req.body.documento)
    //let cou = estudiantesInscritos.find(td => td.curso == req.body.curso)
    //let courseIns = estudiantesInscritos.find(td => td.curso == req.body.curso)
    //console.log(duplicado);
    if(!doc){
        estudiantesInscritos.push(insCurso);
        inscritos();
        //res.redirect("cursos");
        res.redirect("exito");
        
    }else{
        res.redirect("errorInscricion");
        
    }
})

app.get("/errorInscricion", function(req, res){
    res.render("./errores/errorInscrito");
    //console.log(listaCursos);
})

app.get("/exito", function(req, res){
    res.render("./errores/exito");
    //console.log(listaCursos);
})

app.get("/inscritos", function(req, res){
    res.render("inscritos", { dark: estudiantesInscritos = require('./views/inscritos/estInscritos.json'), ins: listaCursos = require('./views/cursosGuardados.json')});
    //console.log(listaCursos);
})



app.get("/inscritos", function(req, res){
    res.render("inscritos", { dataCursos: listaCursos = require('./views/cursosGuardados.json')});
    //console.log(listaCursos);
})

//Eliminar un estudiante inscrito
app.get("/eliminarInscrito/:id/:curso", function(req,res){
    listarCursos();
    var documentoParams = req.params.id;
    var cursoParams = req.params.curso;


    console.log(cursoParams);

    for (let i = 0; i < estudiantesInscritos.length; i++) {
        const elemento = estudiantesInscritos[i];
        //console.log("iteracion "+ i );
        if(elemento.documento == documentoParams  && elemento.curso == cursoParams){
            console.log("elemento curso "+elemento.documento);

            //Primera forma para eliminar usando el filter
            //Filtar cursos por Id o documento cuando se diferente al documento de parametro
            //let filtrados = estudiantesInscritos.filter(buscar => !(buscar.documento == documentoParams  && buscar.curso == cursoParams ));
            //estudiantes filtrados
            //console.log(filtrados);
            //Guardar los estudiantes menos el que se quiere elimar
            //estudiantesInscritos = filtrados;

            //Segundo forma para eliminar usando el finIndex
            //Devuelve el index del curso a eliminar
            index = estudiantesInscritos.findIndex(buscar => (buscar.documento == documentoParams && buscar.curso == cursoParams));
            console.log(index);

            //Condicion para eliminar cuando el index  es  mayor a -1 o   igual a 0
            if (index > -1) {
                //eliminar estudiante con splice pasando como parametro el index y el numero a borrar
                estudiantesInscritos.splice(index, 1);
                }


            console.log("estudiante eliminado ");

            //Guardar estudiantes inscritos
            inscritos();
            break;

        }
    }
    res.redirect("/inscritos");


});

//Se crea esta constante para poder agregar mas información al JSON sin necesida de borrarse lo otro
const listar = () => {
    //Si lista estudiante este vaciao
    try{
    //Primera forma
    listaCursos = require('./views/cursosGuardados.json');//Forma constante
    /*
    //Segunda forma
    listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));//Forma asincronica
    */
    } catch(error){
        listaCursos = [];
    }
}
 

//Función guardar cursos
const guardar = () => {
    //Creamos una variable y utilizamos la fución de JSON que hace es guardar un string
    let datos = JSON.stringify(listaCursos);
    //Función de guardar archivo JSON
    fs.writeFile('./views/cursosGuardados.json', datos, (err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    })
}

const listarCursos = () => {
    //Si lista estudiante este vaciao
    try{
    //Primera forma
    estudiantesInscritos = require('./views/inscritos/estInscritos.json');//Forma constante
    /*
    //Segunda forma
    listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));//Forma asincronica
    */
    } catch(error){
        estudiantesInscritos = [];
    }
}
//Función guardar estudiantes
const inscritos = () => {
    //Creamos una variable y utilizamos la fución de JSON que hace es guardar un string
    let datos = JSON.stringify(estudiantesInscritos);
    //Función de guardar archivo JSON
    fs.writeFile('./views/inscritos/estInscritos.json', datos, (err)=>{
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    })
}



app.listen(port, () => {
    console.log('Escuchando el puerto ' + port)
});
