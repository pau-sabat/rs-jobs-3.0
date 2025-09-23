import * as components from '../components/index.js';
import Loading from '../components/Loading.svelte';
import Backdrop from '../components/Backdrop.svelte';

// Mapping of component names to classes
const componentMap: Record<string, any> = {
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
	Save: components.Save,
	CookieBanner: components.CookieBanner,
	LanguageSelector: components.LanguageSelector,
};

export default function initializeSvelte(): void {
	// Load global components
	const globalTarget = document.getElementById('global-svelte');
	if (globalTarget) {
		new Loading({ target: globalTarget });
		new Backdrop({ target: globalTarget });
	}

	// Search all containers with data-component attribute
	const containers = document.querySelectorAll('[data-component]');

	containers.forEach(container => {
		const componentName = container.getAttribute('data-component');
		const ComponentClass = componentMap[componentName!];

		if (ComponentClass) {
			try {
				// Read all data-* attributes and convert them to props
				const props: Record<string, any> = {};
				Array.from(container.attributes).forEach(attr => {
					if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
						// Convert kebab-case or snake_case to camelCase
						let propName = attr.name.replace('data-', '');
						let value: any = attr.value;

						// Try to convert to number if possible
						if (!isNaN(Number(value)) && value !== '') {
							value = Number(value);
						}

						// Try to parse JSON if the value seems to be JSON
						if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
							try {
								value = JSON.parse(value);
							} catch (e) {
								// If the parse fails, keep the original value
								console.warn(`Failed to parse JSON for ${propName}:`, value);
							}
						}

						props[propName] = value;
					}
				});

				new ComponentClass({
					target: container,
					props: props,
				});
			} catch (error) {
				console.error(`❌ Error mounting component ${componentName}:`, error);
			}
		} else {
			console.warn(`⚠️ Component ${componentName} not found in componentMap - removing container from DOM`);
			// Remove the container from the DOM to avoid design problems
			container.remove();
		}
	});
}
