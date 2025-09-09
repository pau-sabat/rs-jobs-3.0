const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src', 'views'))

// Middleware para parsear JSON
app.use(express.json())

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


let dayjs
const loadDayjs = async () => {
	const dayjsModule = await import('./src/services/dayjs.mjs')
	dayjs = dayjsModule.default
}
loadDayjs()

app.use(async (req, res, next) => {
	// Asegurar que dayjs esté cargado
	if (!dayjs) {
		await loadDayjs()
	}
	res.locals.fs = fs
	res.locals.path = path
	res.locals.process = process
	res.locals.dayjs = dayjs
	next()
})

// Add md function and date helpers to locals for use in templates
app.use((req, res, next) => {
	res.locals.md = text => {
		if (!marked) return text || ''
		return marked(text || '')
	}
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
	res.status(404).render('pages/error', {
		message: 'Página no encontrada',
		status: 404,
	})
})

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
	console.error('Error del servidor:', err)
	res.status(500).render('pages/error', {
		message: 'Error interno del servidor',
		status: 500,
	})
})

const PORT = 3000
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
})
