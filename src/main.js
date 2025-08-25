// Punto de entrada principal para Vite
import initializeSvelte from './scripts/loadComponents.js'
import { initNavbar, initLocationSelect, initSwiper, initBackdrop } from './scripts/index.js'

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', main())
} else {
	main()
}

function main() {
	initializeSvelte()
	initNavbar()
	initBackdrop()
	initSwiper()
	initLocationSelect()
}
