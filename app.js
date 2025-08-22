const express = require('express')
const app = express()
const path = require('path')
const dateHelper = require('./src/services/dayjs')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src', 'views'))

// Configure marked for safe HTML output
let marked
;(async () => {
	const { marked: markedModule } = await import('marked')
	marked = markedModule
	marked.setOptions({
		breaks: true,
		gfm: true,
	})
})()

// Add md function and date helpers to locals for use in templates
app.use((req, res, next) => {
	res.locals.md = text => {
		if (!marked) return text || ''
		return marked(text || '')
	}

	// Agregar dayjs a todas las plantillas
	res.locals.dayjs = dateHelper.dayjs
	next()
})

app.use(express.static('public'))

// Ruta específica para archivos de Vite
app.use('/static', express.static(path.join(__dirname, 'public/static')))

// Ruta específica para archivos de datos JSON
app.use('/data', express.static(path.join(__dirname, 'data')))

// Importar y usar rutas
const routes = require('./src/routes')

// Usar rutas principales
app.use('/', routes)

// Middleware para manejo de errores 404
app.use((req, res) => {
	res.status(404).render('error', {
		message: 'Página no encontrada',
		status: 404,
	})
})

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
	console.error('Error del servidor:', err)
	res.status(500).render('error', {
		message: 'Error interno del servidor',
		status: 500,
	})
})

const PORT = 3000
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
