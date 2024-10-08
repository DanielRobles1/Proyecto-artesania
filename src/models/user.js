const mongoose = require('mongoose');
// esto es para el usario 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // nombre 
  },
  email: {
    type: String,
    required: true // para email
  },
  password: {
    type: String,
    required: true // para contraseña
  }
});

module.exports = mongoose.model('User', userSchema);
