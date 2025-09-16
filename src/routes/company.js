const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/:company', async (req, res) => {
	// fetch(`/data/mockCompany.json`)
	// 	.then(response => response.json())
	// 	.then(companyData => {
	// 		console.log(companyData)
	// 		res.render('pages/company', {
	// 			data: companyData,
	// 		})
	// 	})
	// 	.catch(error => {
	// 		console.error('Error fetching company data:', error)
	// 		res.status(404).render('pages/error', {
	// 			message: 'Empresa no encontrada',
	// 			status: 404,
	// 		})
	// 	})
	const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/mockCompany.json')))
	res.render('pages/company', {
		data
	})
})

module.exports = router
