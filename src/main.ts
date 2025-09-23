// Punto de entrada principal para Vite
import initializeSvelte from './scripts/loadComponents';
import { initNavbar, initLocationSelect, initSwiper, initCategoriesSelect, jobOffer } from './scripts/index';

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
	initLocationSelect();
	initCategoriesSelect();
	jobOffer();
}
