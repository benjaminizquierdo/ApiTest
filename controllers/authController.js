// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'Temporal2023.'; // Clave secreta para firmar el token

// Simulación de base de datos
const usuarios = [
  { id: 1, email: 'usuario@example.com', password: bcrypt.hashSync('password123', 10) }
];

// Generar JWT
const generarToken = (usuario) => {
  const payload = {
    id: usuario.id,
    email: usuario.email,
    password: usuario.password
  };
  // Opciones del token
  const opciones = {
    expiresIn: '1h', // Expira en 24 horas (puedes hacerlo más largo, como '7d' para 7 días)
  };
  // Generar token
  const token = jwt.sign(payload, secretKey, opciones);
  return token;
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

  // Verificar contraseña
  const esValida = bcrypt.compareSync(password, usuario.password);
  if (!esValida) return res.status(401).json({ error: 'Credenciales inválidas' });

  // Generar token y responder
  const token = generarToken(usuario);
  res.json({ mensaje: 'Inicio de sesión exitoso', token });
};

// Ruta protegida
const rutaProtegida = (req, res) => {
  res.json({ mensaje: 'Acceso autorizado', usuario: req.usuario });
};

module.exports = { login, rutaProtegida };
