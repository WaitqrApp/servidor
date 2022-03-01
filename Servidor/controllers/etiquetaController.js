const NombreEtiqueta = require('../models/NombreEtiqueta');
const Etiqueta = require('../models/Etiqueta');
const {validationResult} = require('express-validator');

//Crea un nuevo menu

exports.crearEtiqueta = async (req, res) =>{
   //Revisar si hay errores
   const errores = validationResult(req);
   if(!errores.isEmpty()){
       return res.status(400).json({errores: errores.array()})
   }

   //Extraer el menu y comprobar si existe
   const {nombreetiqueta} = req.body;
   try {
       const existeNombreEtiqueta = await NombreEtiqueta.findById(nombreetiqueta);
       if(!existeNombreEtiqueta){
           return res.status(404).json({msg: 'NombreEtiqueta no encontrado'})
       }

       //Revisar si el menu actual pertenece al usuario autenticado
       if(existeNombreEtiqueta.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No autorizado'});
    }

    //Creamos la seccion
    const etiqueta = new Etiqueta(req.body);
    etiqueta.creador = req.usuario.id;

    await etiqueta.save();
    res.json({etiqueta});

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }
           
}

//Obtiene las secciones por menu
exports.obtenerEtiquetas = async (req, res) =>{
    try {
        //Extraer el menu y comprobar si existe
   const {nombreetiqueta} = req.query; 
   console.log(req.query);
        const existeNombreEtiqueta = await NombreEtiqueta.findById(nombreetiqueta);
        if(!existeNombreEtiqueta){
            return res.status(404).json({msg: 'NombreEtiqueta no encontrado'})
        }

     //Obtener secciones por menu
     const etiquetas = await Etiqueta.find({nombreetiqueta });
     res.json({etiquetas}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar una seccion


exports.actualizarEtiqueta = async(req, res) =>{
    try {
         //Extraer el Menu y comprobar si existe
   const {nombre, disponible} = req.body; 
   const existeNombreEtiqueta = await NombreEtiqueta.findById(nombreetiqueta);
 
   //Revisar si la seccion existe o no
    let etiquetaExiste = await Etiqueta.findById(req.params.id);
    if(!etiquetaExiste){
        return res.status(404).json({msg: "No existe la etiqueta"});
    }
   //Revisar si el menu actual pertenece al usuario autenticado
   if(existeNombreEtiqueta.creador.toString() !== req.usuario.id){
    return res.status(401).json({msg: 'No autorizado'});
}
//Crear un objeto con la nueva informacion
const nuevaEtiqueta ={};
if(nombre){
    nuevaEtiqueta.nombre = nombre;
}
if(disponible){
    nuevaEtiqueta.disponible = disponible;
}

//guardar seccion
etiqueta = await Etiqueta.findOneAndUpdate({_id: req.params.id}, nuevaEtiqueta, {
    new: true});
    res.json({etiqueta})
        
    } catch (error) {
        console.timeLog(error);
        res.status(500).send('Hubo un error'); 

    }
}

//eliminar Seccion
exports.eliminarEtiqueta = async (req, res) =>{

    try {
        //Extraer el menu y comprobar si existe
  const {nombreetiqueta} = req.body;
  const existeNombreEtiqueta = await NombreEtiqueta.findById(nombreetiqueta);

  //Revisar si el menu existe o no
   let etiquetaExiste = await Etiqueta.findById(req.params.id);
   if(!etiquetaExiste){
       return res.status(404).json({msg: "No existe la etiqueta"});
   }
 
//eliminar
await Etiqueta.findByIdAndRemove({_id: req.params.id});
res.json({msg: 'etiqueta eliminada'})
       
   } catch (error) {
       console.timeLog(error);
       res.status(500).send('Hubo un error');

   }

}