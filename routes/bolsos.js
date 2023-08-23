const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productosController');

// api/bolsos (ruta base: /api/bolsos)
router.post('/', productoController.createProducto);
router.get('/', productoController.getAllProductos);
router.put('/:id', productoController.updateProducto);
router.get('/:id', productoController.getProductoById);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;
