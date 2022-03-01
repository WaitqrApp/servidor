const Platillo = require('../models/Platillo');
const NombreEtiqueta = require('../models/NombreEtiqueta');
const {validationResult} = require('express-validator');

//Crea un nuevo menu

exports.crearNombreEtiqueta = async (req, res) =>{
   //Revisar si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
       return res.status(400).json({errores: errores.array()})
   }

   //Extraer el menu y comprobar si existe
   const {platillo} = req.body;
   try {
       const existePlatillo = await Platillo.findById(platillo);
       if(!existePlatillo){
           return res.status(404).json({msg: 'Platillo no encontrado'})
       }

       //Revisar si el menu actual pertenece al usuario autenticado
       if(existePlatillo.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No autorizado'});
    }

    //Creamos la seccion
    const nombreetiqueta = new NombreEtiqueta(req.body);
    nombreetiqueta.creador = req.usuario.id;

    await nombreetiqueta.save();
    res.json({nombreetiqueta});

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }
           
}

//Obtiene las secciones por menu
exports.obtenerNombreEtiquetas = async (req, res) =>{
    try {
        //Extraer el menu y comprobar si existe
   const {platillo} = req.query; 
   console.log(req.query);
        const existePlatillo = await Platillo.findById(platillo);
        if(!existePlatillo){
            return res.status(404).json({msg: 'Platillo no encontrado'})
        }

     //Obtener secciones por menu
     const nombreetiquetas = await NombreEtiqueta.find({platillo });
     res.json({nombreetiquetas}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar una seccion


exports.actualizarNombreEtiqueta = async(req, res) =>{
    try {
         //Extraer el Menu y comprobar si existe
   const {nombre, disponible} = req.body; 
   const existePlatillo = await Platillo.findById(platillo);
 
   //Revisar si la seccion existe o no
    let nombreetiquetaExiste = await NombreEtiqueta.findById(req.params.id);
    if(!nombreetiquetaExiste){
        return res.status(404).json({msg: "No existe la nombreetiqueta"});
    }
   //Revisar si el menu actual pertenece al usuario autenticado
   if(existePlatillo.creador.toString() !== req.usuario.id){
    return res.status(401).json({msg: 'No autorizado'});
}
//Crear un objeto con la nueva informacion
const nuevaNombreEtiqueta ={};
if(nombre){
    nuevaNombreEtiqueta.nombre = nombre;
}
if(disponible){
    nuevaNombreEtiqueta.disponible = disponible;
}

//guardar seccion
nombreetiqueta = await NombreEtiqueta.findOneAndUpdate({_id: req.params.id}, nuevaNombreEtiqueta, {
    new: true});
    res.json({nombreetiqueta})
        
    } catch (error) {
        console.timeLog(error);
        res.status(500).send('Hubo un error'); 

    }
}

//eliminar Seccion
exports.eliminarNombreEtiqueta = async (req, res) =>{

    try {
        //Extraer el menu y comprobar si existe
  const {platillo} = req.body;
  const existePlatillo = await Platillo.findById(platillo);

  //Revisar si el menu existe o no
   let nombreetiquetaExiste = await NombreEtiqueta.findById(req.params.id);
   if(!nombreetiquetaExiste){
       return res.status(404).json({msg: "No existe la nombreetiqueta"});
   }
 
//eliminar
await NombreEtiqueta.findByIdAndRemove({_id: req.params.id});
res.json({msg: 'nombreetiqueta eliminada'})
       
   } catch (error) {
       console.timeLog(error);
       res.status(500).send('Hubo un error');

   }

}