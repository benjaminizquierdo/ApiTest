// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No se proporcionó un token' });

  try {
    const decoded = jwt.verify(token, 'Temporal2023.');
    req.usuario = decoded; // Añadir información del usuario al request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = { verificarToken };