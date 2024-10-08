const express = require('express');
const router = express.Router(); 
const Order = require('../models/oreden')
// Crear una nueva orden
router.post('/', async (req, res) => {
    const nuevaOrden = new Order(req.body); // Cambiado a "nuevaOrden"
    try {
        const savedOrden = await nuevaOrden.save();
        res.status(201).json(savedOrden);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todas las órdenes del usuario autenticado
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }); // ID del usuario autenticado
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una orden específica
router.get('/:id', async (req, res) => {
    try {
        const orden = await Order.findById(req.params.id); // Cambiado a "Order"
        if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json(orden);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
