const express = require('express');
const router = express.Router();
const nombreetiquetaController = require('../controllers/nombreetiquetaController');
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//crear una seccion
//api/secciones
router.post('/',
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('platillo','El platillo es obligatorio').not().isEmpty()
],

nombreetiquetaController.crearNombreEtiqueta
);

router.get('/',
nombreetiquetaController.obtenerNombreEtiquetas
);

//Actualizar seccion
router.put('/:id',
    auth,
    nombreetiquetaController.actualizarNombreEtiqueta
);

//Eliminar menu
router.delete('/:id',
auth,
    nombreetiquetaController.eliminarNombreEtiqueta
);

module.exports = router;