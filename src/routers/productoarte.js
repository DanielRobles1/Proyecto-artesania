// Importa el módulo express
const express = require("express");
// Crea un router de express
const router = express.Router();
// Importa el modelo Producto
const Producto = require('../models/producto');

// Obtener todas las artesanías
router.get('/', async (req, res) => {
    // Manejo de errores
    try {
        // Consulta para obtener los productos
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva artesanía
router.post('/', async (req, res) => {
    const product = new Producto(req.body); // Asegúrate de que el nombre del modelo sea correcto
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener artesanía por su ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Producto.findById(req.params.id); // Asegúrate de que el nombre del modelo sea correcto
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una artesanía por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar artesanía por ID
router.delete('/:id', async (req, res) => {
    try {
        const removedProduct = await Producto.findByIdAndDelete(req.params.id);
        if (!removedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
