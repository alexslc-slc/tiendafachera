const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let productos = [];
let contadorId = 1;

// Vista principal (Tabla + Drawer)
app.get('/', (req, res) => {
  res.render('index', { productos });
});

// Redirección si se accede por URL directa a /nuevo o /editar
app.get('/nuevo', (req, res) => res.redirect('/'));
app.get('/editar/:id', (req, res) => res.redirect('/'));

// Crear Producto desde el Drawer
app.post('/nuevo', (req, res) => {
  const { nombre, precio } = req.body;
  if (nombre && precio) {
    productos.push({ id: contadorId++, nombre, precio: parseFloat(precio) });
  }
  res.redirect('/');
});

// Actualizar Producto desde el Drawer
app.post('/actualizar/:id', (req, res) => {
  const { nombre, precio } = req.body;
  const producto = productos.find(p => p.id == req.params.id);
  if (producto) {
    producto.nombre = nombre;
    producto.precio = parseFloat(precio);
  }
  res.redirect('/');
});

// Eliminar Producto
app.get('/eliminar/:id', (req, res) => {
  productos = productos.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});