const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 4000; // Cambia esto al puerto que desees

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}${extname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Endpoint para subir una imagen
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha seleccionado ningún archivo.');
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  // Aquí puedes guardar imageUrl en tu base de datos junto con otros datos del producto

  res.json({ imageUrl });
});

// Ruta para servir imágenes desde el servidor
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
