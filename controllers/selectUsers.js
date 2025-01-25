const db = require('../db'); // Importar conexión a base de datos


const obtenerUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return JSON.stringify([rows]);
  } catch (error) {
    console.error('Error en obtenerUsers:', error);
    console.log('Error en obtenerUsers:', error);
     // return res.status(500).json({ error: 'No se pudo obtener los usuarios' });
  }
};
module.exports = { obtenerUsers };