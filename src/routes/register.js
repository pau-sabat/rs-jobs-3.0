const express = require('express')
const router = express.Router()

// Ruta para la página de login
router.get('/', (req, res) => {
	res.render('pages/register')
})

module.exports = router
