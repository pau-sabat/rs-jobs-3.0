import express from 'express'
const router = express.Router()
import { render, renderWithData } from '../middlewares/renderMiddleware.js'
import fileService from '../services/fileService.js'
import { changeLanguage } from '../controllers/languageController.js'

// Language routes
router.get('/change-language', changeLanguage)

// Main routes
router.get('/', renderWithData('home', async req => {
	const data = fileService.readJson('cities')
	return {
		data: data || [],
	}
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

export default router
