const Usuario = require("../models/usuario");

module.exports = function(req, res, next){
    if(!req.session.usuario_id){
        res.redirect("/login");
    }else{
        Usuario.findById(req.session.usuario_id, function(err, usuario){
            if(err){
                console.log(err);
                res.redirect("/login");
            }else{
                res.locals = { usuario: usuario};
                console.log(usuario);
                next();
            }

        })
        
    }
}