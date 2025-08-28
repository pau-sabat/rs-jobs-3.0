import * as components from '../components/index.js'

// Mapeo de nombres de componentes a clases
const componentMap = {
	// Agregar más componentes aquí:
	JobList: components.JobList,
	CompanySearch: components.CompanySearch,
	ContactForm: components.ContactForm,
	LoginForm: components.LoginForm,
	HeroSearch: components.HeroSearch,
}

export default function initializeSvelte() {
	// Buscar todos los contenedores con atributo data-component
	const containers = document.querySelectorAll('[data-component]')

	containers.forEach((container, index) => {
		const componentName = container.getAttribute('data-component')
		const ComponentClass = componentMap[componentName]

		if (ComponentClass) {
			try {
				// Leer todos los atributos data-* y convertirlos en props
				const props = {}
				Array.from(container.attributes).forEach(attr => {
					if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
						const propName = attr.name.replace('data-', '')
						let value = attr.value

						// Intentar convertir a número si es posible
						if (!isNaN(value) && value !== '') {
							value = Number(value)
						}

						props[propName] = value
					}
				})

				new ComponentClass({
					target: container,
					props: props
				})
			} catch (error) {
				console.error(`❌ Error mounting component ${componentName}:`, error)
			}
		} else {
			console.warn(`⚠️ Component ${componentName} not found in componentMap - removing container from DOM`)
			// Quitar el contenedor del DOM para evitar problemas de diseño
			container.remove()
		}
	})
}
