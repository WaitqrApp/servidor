const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/etiquetaController');
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//crear una seccion
//api/secciones
router.post('/',
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombreetiqueta','El menu es obligatorio').not().isEmpty()
],

etiquetaController.crearEtiqueta
);

router.get('/',
etiquetaController.obtenerEtiquetas
);

//Actualizar seccion
router.put('/:id',
    auth,
    etiquetaController.actualizarEtiqueta
);

//Eliminar menu
router.delete('/:id',
auth,
    etiquetaController.eliminarEtiqueta
);

module.exports = router;