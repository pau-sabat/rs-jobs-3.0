const express = require('express')
const router = express.Router()

// Ruta para la página de búsqueda de trabajo
router.get('/', (req, res) => {
	res.render('pages/search-company')
})

module.exports = router
