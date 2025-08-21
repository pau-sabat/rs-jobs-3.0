const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Ruta principal de la página de inicio
router.get('/', (req, res) => {
	const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/home.json')))
	res.render('pages/home', { data })
})

module.exports = router
