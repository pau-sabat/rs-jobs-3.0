const express = require('express');
const router = express.Router();

// Importar rutas específicas
const homeRoutes = require('./home');
const jobRoutes = require('./jobs');
const companyRoutes = require('./companies');

// Configurar rutas
router.use('/', homeRoutes);
router.use('/ofertas-trabajo', jobRoutes);
router.use('/busqueda-de-empresas', companyRoutes);

module.exports = router;
