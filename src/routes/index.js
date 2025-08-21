const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Importar rutas específicas
const homeRoutes = require('./home');
const jobRoutes = require('./jobs');

// Configurar rutas
router.use('/', homeRoutes);
router.use('/buscar-trabajo', jobRoutes);

module.exports = router;
