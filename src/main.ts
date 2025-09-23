// Punto de entrada principal para Vite
import { initCategoriesSelect, initNavbar, initSwiper, jobOffer } from './scripts/index';
import initializeSvelte from './scripts/loadComponents';

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', main);
} else {
	main();
}

function main(): void {
	initializeSvelte();
	initNavbar();
	initSwiper();
	initCategoriesSelect();
	jobOffer();
}
