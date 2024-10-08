const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

// Registrar usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Guardar usuario
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Crear y enviar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware para proteger rutas
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

// Obtener perfil de usuario (ruta protegida)
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Buscar el perfil del usuario usando el ID almacenado en el token
        const user = await User.findById(req.user.id).select('-password');  // Excluir el campo de contraseña
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
