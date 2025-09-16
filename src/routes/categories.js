const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/', (req, res) => {
	const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/categories.json')))
	res.render('pages/categories', { data })
})

module.exports = router
