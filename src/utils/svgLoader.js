import fs from 'fs'
import path from 'path'

export function loadSvgs() {
	const dir = path.join(process.cwd(), 'public/assets/images/icons')
	const files = fs.readdirSync(dir)
	const svgs = {}

	files.forEach(file => {
		if (file.endsWith('.svg')) {
			const name = path.basename(file, '.svg')
			svgs[name] = fs.readFileSync(path.join(dir, file), 'utf8')
		}
	})

	return svgs
}
