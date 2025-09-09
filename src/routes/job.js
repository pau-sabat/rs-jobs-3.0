const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Ruta para la página de búsqueda de trabajo
router.get('/:job', async (req, res) => {
	//mock data fetching
	// fetch(`/data/mockJob.json`)
	// 	.then(response => response.json())
	// 	.then(jobData => {
	// 		console.log(jobData)
	// 		res.render('pages/job', {
	// 			data: jobData,
	// 		})
	// 	})
	// 	.catch(error => {
	// 		console.error('Error fetching job data:', error)
	// 		res.status(404).render('pages/error', {
	// 			message: 'Oferta no encontrada',
	// 			status: 404,
	// 		})
	// 	})
	const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/mockJob.json')))
	res.render('pages/job', {
		data,
	})
})

module.exports = router
