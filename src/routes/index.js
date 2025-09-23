const express = require('express')
const router = express.Router()
const { render, renderWithData } = require('../middlewares/renderMiddleware')
const fileService = require('../services/fileService')

router.get('/', renderWithData('home', async req => {
	const data = fileService.readJson('cities')
	return { data: data || [] }
}))
router.get('/ofertas-trabajo', render('search-job'))
router.get('/busqueda-de-empresas', render('search-company'))
router.use(
	'/empresa',
	renderWithData('company', async req => {
		const data = fileService.readJson('mockCompany')
		return { data }
	})
)
router.get('/oferta-de-empleo', renderWithData('job', async req => {
	const data = fileService.readJson('mockJob')
	return { data }
}))
router.get(
	'/categorias',
	renderWithData('categories', async req => {
		const categoriesData = fileService.readJson('categories')
		return { data: categoriesData || [] }
	})
)

router.get('/contacto', render('contact'))
router.get('/login', render('login'))
router.get('/registro', render('register'))
router.get('/politica-de-cookies', render('cookies'))
router.get('/politica-de-privacidad-para-candidatos', render('privacy-candidate'))
router.get('/aviso-legal', render('legal-notice'))
router.get('/terminos-y-condiciones-para-candidatos', render('terms-candidate'))

module.exports = router
