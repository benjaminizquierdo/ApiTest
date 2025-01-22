const os = require('os'); // Para información del sistema operativo
// const mongoose = require('mongoose'); // Si usas MongoDB

exports.status = async (req, res) => {
  try {
    // Estado básico del servidor
    const serverStatus = {
      status: 'Servidor activo',
      timestamp: new Date(),
      uptime: process.uptime(), // Tiempo de actividad del servidor
      memoryUsage: process.memoryUsage(), // Uso de memoria
      loadAverage: os.loadavg(), // Promedio de carga del sistema (Unix)
      hostname: os.hostname(), // Nombre del servidor
      platform: os.platform(), // Plataforma del SO
      errors: [], // Inicializar errores vacíos
    };

    // Verificar conexión con la base de datos (MongoDB en este caso)
    // if (mongoose.connection.readyState !== 1) {
    //   serverStatus.errors.push('Conexión con la base de datos fallida.');
    // }

    // Verificar uso de memoria
    const memoryThreshold = 80; // Porcentaje de uso de memoria aceptable
    const memoryUsage = (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100;
    if (memoryUsage > memoryThreshold) {
      serverStatus.errors.push(`Uso de memoria alto (${memoryUsage.toFixed(2)}%).`);
    }

    // Verificar carga del sistema
    const loadThreshold = os.cpus().length; // Promedio de carga aceptable (1 por núcleo)
    if (os.loadavg()[0] > loadThreshold) {
      serverStatus.errors.push(
        `Carga del sistema alta (${os.loadavg()[0].toFixed(2)}). Máximo recomendado: ${loadThreshold}.`
      );
    }

    // Si hay errores, devolver estado con advertencias
    if (serverStatus.errors.length > 0) {
      return res.status(500).json({
        status: 'Advertencias detectadas',
        ...serverStatus,
      });
    }

    // Si todo está bien
    return res.status(200).json(serverStatus);

  } catch (error) {
    // Manejo de errores inesperados
    return res.status(500).json({
      status: 'Error crítico',
      message: error.message,
      stack: error.stack,
    });
  }
};
