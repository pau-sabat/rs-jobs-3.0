const express = require('express')
const router = express.Router()

// Ruta principal de la página de inicio
router.get('/', (req, res) => {
	res.render('pages/home')
})

module.exports = router
