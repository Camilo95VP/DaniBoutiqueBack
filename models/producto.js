const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: String,
  imagen: String,
  color: [String]
});

module.exports = mongoose.model('Producto', productoSchema);
