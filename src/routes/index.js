const express = require('express')
const router = express.Router()

// Importar rutas específicas
const homeRoutes = require('./home')
const jobRoutes = require('./jobs')
const companiesRoutes = require('./companies')
const companyRoutes = require('./company')
const contactRoutes = require('./contact')
const loginRoutes = require('./login')
const registerRoutes = require('./register')
const jobOfferRoutes = require('./job')
const categoriesRoutes = require('./categories')

// Configurar rutas
router.use('/', homeRoutes)
router.use('/ofertas-trabajo', jobRoutes)
router.use('/busqueda-de-empresas', companiesRoutes)
router.use('/empresa', companyRoutes)
router.use('/contacto', contactRoutes)
router.use('/login', loginRoutes)
router.use('/registro', registerRoutes)
router.use('/oferta-de-empleo', jobOfferRoutes)
router.use('/categorias', categoriesRoutes)
router.use('/politica-de-cookies', (req, res) => {
	res.render('pages/cookies')
})

module.exports = router
