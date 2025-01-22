// routes/api.js

const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');

// Importar controladores
const salesController = require('../controllers/sales');
const purchaseController = require('../controllers/purchase');
const statusController = require('../controllers/serverController');
const loginController = require('../controllers/authController');

router.all('/:ruta/:accion/:id?', (req, res) => {
  const { ruta, accion,id} = req.params; // Capturamos los parámetros dinámicos
  const metodo = req.method; // Obtenemos el método HTTP
  console.log(metodo);

  switch (ruta) {
    case 'sales':
      switch (accion) {
        case 'save':
          return verificarToken(req,res,()=>salesController.save(req,res));
        default:
          error404(res);
      }
    case 'purchase':
      switch (accion) {
        case 'save':
          return verificarToken(req,res,()=>purchaseController.save(req,res));
        default:
          error404(res);
      }
    case 'status':
      switch (accion) {
        case 'status':
          return statusController.status(req,res);
        default:
          error404(res);
      }
    case 'auth':
      switch (accion) {
        case 'login':
          return loginController.login(req,res);
        default:
          error404(res);
      }
    default:
      error404(res);
  }
});

function error404(res) {
  res.status(404).json({ error: `Recurso no encontrado ${res}` });	
}

module.exports = router;
