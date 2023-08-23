const Producto = require('../models/producto');
const multer = require('multer');
const path = require('path');

// Configura multer para guardar el archivo con su nombre original
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Usa el nombre original del archivo
    const originalFileName = file.originalname.replace('.png.png', '.png');
    cb(null, originalFileName);
    
  },
});

const upload = multer({ storage });

exports.createProducto = async (req, res) => {
  try {
    upload.single('imagen')(req, res, async (err) => {
      if (err) {
        console.error('Error al cargar la imagen:', err);
        res.status(500).json({ message: 'Error al cargar la imagen', error: err.message });
        return;
      }
      
      // Si no hay errores al cargar la imagen, continúa con la creación del producto
      const { nombre, precio, color } = req.body;
      const originalFileName = req.file.originalname.replace('.png.png', '.png');;
      const imagen = originalFileName; // Usamos el nombre original del archivo

      // Dividir la cadena de colores en un array
        const coloresArray = color.split(',').map(color => color.trim());
        // Resto de tu lógica aquí...
  

      const nuevoProducto = new Producto({
        nombre,
        precio,
        imagen,
        color: coloresArray,
      });

      const productoGuardado = await nuevoProducto.save();
      res.status(201).json(productoGuardado);
      console.log(productoGuardado);
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Controlador para obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// Controlador para obtener un producto por su ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Controlador para actualizar un producto por su ID
exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Controlador para eliminar un producto por su ID
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};
