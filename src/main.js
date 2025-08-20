// Punto de entrada principal para Vite
import * as components from './components/index.js';

// Mapeo de nombres de componentes a clases
const componentMap = {
	ExampleComponent: components.ExampleComponent,
	// Agregar más componentes aquí:
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeSvelte);
} else {
	initializeSvelte();
}

function initializeSvelte() {
	console.log('🚀 Svelte initializing...');

	// Buscar todos los contenedores con atributo data-component
	const containers = document.querySelectorAll('[data-component]');

	containers.forEach((container, index) => {
		const componentName = container.getAttribute('data-component');
		const ComponentClass = componentMap[componentName];

		if (ComponentClass) {
			try {
				new ComponentClass({
					target: container,
				});
			} catch (error) {
				console.error(`❌ Error mounting component ${componentName}:`, error);
			}
		} else {
			console.warn(`⚠️ Component ${componentName} not found in componentMap - removing container from DOM`);
			// Quitar el contenedor del DOM para evitar problemas de diseño
			container.remove();
		}
	});
}
