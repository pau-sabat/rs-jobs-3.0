import * as components from '../components/index.js'

// Mapeo de nombres de componentes a clases
const componentMap = {
	// Agregar más componentes aquí:
	JobList: components.JobList,
	CompanySearch: components.CompanySearch,
	ContactForm: components.ContactForm,
	LoginForm: components.LoginForm,
	HeroSearch: components.HeroSearch,
	JobCard: components.JobCard,
	Paginator: components.Paginator,
	CompanyJobs: components.CompanyJobs,
	RegisterForm: components.RegisterForm,
	Alert: components.Alert,
}

export default function initializeSvelte() {
	// Buscar todos los contenedores con atributo data-component
	const containers = document.querySelectorAll('[data-component]')

	containers.forEach(container => {
		const componentName = container.getAttribute('data-component')
		const ComponentClass = componentMap[componentName]

		if (ComponentClass) {
			try {
				// Leer todos los atributos data-* y convertirlos en props
				const props = {}
				Array.from(container.attributes).forEach(attr => {
					if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
						// Convertir kebab-case o snake_case a camelCase
						let propName = attr.name.replace('data-', '')
						let value = attr.value

						// Intentar convertir a número si es posible
						if (!isNaN(value) && value !== '') {
							value = Number(value)
						}

						// Intentar parsear JSON si el valor parece ser JSON
						if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
							try {
								value = JSON.parse(value)
							} catch (e) {
								// Si falla el parse, mantener el valor original
								console.warn(`Failed to parse JSON for ${propName}:`, value)
							}
						}

						props[propName] = value
					}
				})

				new ComponentClass({
					target: container,
					props: props,
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
