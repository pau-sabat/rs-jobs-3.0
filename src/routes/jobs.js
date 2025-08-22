const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

// Ruta para la página de búsqueda de trabajo
router.get('/', (req, res) => {
	const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/jobs.json')))
	res.render('pages/search-job', { data })
})

module.exports = router
