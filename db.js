const mysql = require('mysql2');

// Configura los parámetros de la conexión
const pool = mysql.createPool({
  host: 'localhost', // Dirección del servidor de MySQL
  user: 'root',      // Usuario de la base de datos
  password: 'Loschuviles@98', // Contraseña del usuario
  database: 'ApiMES', // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exporta un método para usar consultas
const db = pool.promise();

module.exports = db;
