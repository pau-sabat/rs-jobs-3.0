const express = require('express')
const router = express.Router()
const path = require('path')

// Ruta para la página de búsqueda de trabajo
router.get('/', (req, res) => {
	res.render('pages/search-job')
})

module.exports = router
