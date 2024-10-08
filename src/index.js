const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routers/user');
const productosRouter = require('./routers/productoarte');
const ordenRouter = require('./routers/oreden');
const app = express();
const port = process.env.PORT || 3000;


app.get("/", (req,res) => {
  res.send("Artesanias de Oaxaca")
})

// Middleware
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/productos', productosRouter);
app.use('/api/orders', ordenRouter);
// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error de conexión a MongoDB:', error));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
