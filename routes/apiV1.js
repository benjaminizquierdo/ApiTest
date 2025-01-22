const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales');
const purchaseController = require('../controllers/purchase');

// Middleware para manejar recursos dinámicos
router.use('/:recurso/:accion', (req, res, next) => {
  const { recurso, accion } = req.params;
  switch (recurso) {
    case 'sales':
      switch (accion) {
        case 'save':
          return salesController.save(req, res);
        default:
          res.status(404).json({ error: 'Recurso no encontrado' });
      }
    case 'purchase':
      req.controller = purchaseController.save(req, res);
    default:
      res.status(404).json({ error: 'Recurso no encontrado' });
  }

});

module.exports = router;

