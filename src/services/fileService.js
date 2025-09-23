import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Servicio para leer archivos JSON de la carpeta data
 */
class FileService {
	constructor() {
		this.dataPath = path.join(__dirname, '../../data')
		this.cache = new Map()
	}

	/**
	 * Lee un archivo JSON y lo cachea
	 * @param {string} filename - Nombre del archivo (sin extensión .json)
	 * @returns {object} Datos del archivo
	 */
	readJson(filename) {
		// Verificar cache primero
		if (this.cache.has(filename)) {
			return this.cache.get(filename)
		}

		try {
			const filePath = path.join(this.dataPath, `${filename}.json`)
			const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

			// Guardar en cache
			this.cache.set(filename, data)

			return data
		} catch (error) {
			console.error(`Error al leer el archivo ${filename}.json:`, error.message)
			return null
		}
	}

	clearCache() {
		this.cache.clear()
	}
}

const fileService = new FileService()

export default fileService
